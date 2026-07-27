import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session;
    if (!sessionId) {
      return res.status(400).json({ message: "Unauthorized!" });
    }
    const session = await redis.get(`session-${sessionId}`);
    if (!session) {
      return res.status(400).json({ message: "Session expired!" });
    }
    req.user = JSON.stringify(session);
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default protect;
