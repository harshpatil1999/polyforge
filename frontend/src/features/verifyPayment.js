import api from "../../utils/axios";

export const verifyPayment = async (payload) => {
  try {
    const { data } = await api.post("/api/billing/verifyPayment", payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
