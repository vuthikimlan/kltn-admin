import axios from "../request";

export const revenueCourseByTime = (date) => {
  return axios.post("/payment/revenueCourseByTime", date);
};

export const revenueInstructorBymonth = (date) => {
  return axios.post("/payment/revenueInstructorBymonth", date);
};
