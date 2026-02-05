import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://hotshotfinger-us.backendless.app",
});
export const axiosInstance2 = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
