import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/contact",
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
