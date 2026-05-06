import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-backend-nine-gilt.vercel.app/api/contact",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendContactMessage = async (formData) => {
  try {
    const response = await api.post("/send", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network Error" };
  }
};
