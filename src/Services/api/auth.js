import axios from "../request";

export const login = ({ username, password }) => {
  return axios.post("/auth/login", { username, password });
};

export const forgotPasword = async (values) => {
  return axios.post(`/password/forgot`, values);
};
