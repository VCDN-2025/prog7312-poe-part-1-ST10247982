import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001",

  withCredentials: true,
});
export default api;
