import axios from "../request";

export const totalRevenueSystem = () => {
  return axios.get("/payment/total-revenue-system-day");
};

export const totalRevenueSystemByMonth = () => {
  return axios.get("/payment/total-revenue-system-month");
};

export const totalRevenueTeacherByMonth = () => {
  return axios.get("/payment/total-revenue-teacher-month");
};
