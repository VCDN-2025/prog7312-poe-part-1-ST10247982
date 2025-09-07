import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:32769",
  timeout: 1200000,
  withCredentials: true,
});
export default api;
