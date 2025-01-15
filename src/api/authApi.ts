import axiosInstance from "./axiosInstance";

export const signup = async (data: { email: string; password: string }) => {
  return axiosInstance.post("/auth/signup", data);
};

export const signin = async (data: { email: string; password: string }) => {
  return axiosInstance.post("/auth/signin", data);
};
