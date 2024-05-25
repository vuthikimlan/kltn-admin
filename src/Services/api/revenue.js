import axios from "../request";

export const revenueCourseByTime = (date) => {
  return axios.post("/payment/revenueCourseByTime", date);
};

export const revenueInstructorBymonth = (date) => {
  console.log(date);
  return axios.get("/payment/revenueInstructorBymonth", date);
};
