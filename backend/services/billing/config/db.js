import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to the database!");
  } catch (error) {
    console.error("Error connecting to the database : " + error.message);
  }
};

export default connectToDB;
