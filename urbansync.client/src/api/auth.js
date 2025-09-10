import api from "./axios.config";

export const login = async (user) => {
  return apiHandler(() =>
    api.post("/api/auth/login", {
      username: user.username,
      password: user.password,
    })
  );
};

export const register = async (username, password, email, name) => {
  return apiHandler(() => {
    api.post("/api/auth/register", {
      username,
      password,
      email,
      name,
    });
  });
};
