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

export const revenueCourseByDay = (id) => {
  return axios.get(`/payment/revenueCourseByDay/${id}`);
};

export const revenueCourseByMonth = (id) => {
  return axios.get(`/payment/revenueCourseByMonth/${id}`);
};
