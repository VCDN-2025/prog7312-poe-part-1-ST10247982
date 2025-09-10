import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:32769",
   
  withCredentials: true,
});
export default api;
