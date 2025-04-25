import axiosInstance from "./axiosInstance";

const authApi = {
  login: (data) => axiosInstance.post("/user/login", data),
  register: (data) => axiosInstance.post("/user/register", data),
  logout: () => axiosInstance.post("/user/logout"),
  refreshToken: () => axiosInstance.post("/user/refresh-token"),
  getProfile: () => axiosInstance.get("/user/me"), 
};

export default authApi;
