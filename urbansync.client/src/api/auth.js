import api from "./axios.config";

const login = async (user) => {
  try {
    const response = await api.post("/api/auth/login", user);
    if (response.status == 200) {
      return response.data;
    }
  } 
};
