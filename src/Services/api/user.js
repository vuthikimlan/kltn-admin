import axios from "../request";

export const createUser = (values) => {
  return axios.post("/user/create", values);
};

export const getListUser = () => {
  return axios.get("/user/getAll");
};

export const getUserById = (_id) => {
  return axios.get(`/user/${_id}`);
};

export const updateUser = (_id, values) => {
  const data = {
    name: values.name,
    email: values.email,
    username: values.username,
    phone: values.phone,
    role: values.role,
    teacher: {
      specialization: values.specialization,
      experience: values.experience,
      facebook: values.facebook,
    },
    paymentMethod: {
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      bankCode: values.bankCode,
    },
  };
  return axios.put(`/user/${_id}`, data);
};

export const deleteUser = (_id) => {
  return axios.delete(`/user/${_id}`);
};

export const filterTeacher = (values) => {
  const userValues = {
    name: values.name,
    username: values.username,
    email: values.email,
    accountNumber: values.accountNumber,
    accountName: values.accountName,
    role: "TEACHER",
  };
  return axios.post("/user/filter", userValues);
};

export const filterStudent = (values) => {
  const userValues = {
    name: values.name,
    username: values.username,
    email: values.email,
    accountNumber: values.accountNumber,
    accountName: values.accountName,
    role: "STUDENT",
  };
  return axios.post("/user/filter", userValues);
};

export const getProfile = () => {
  return axios.get(`/profile/user`);
};

export const editProfile = (values) => {
  const data = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    teacher: {
      specialization: values.specialization,
      experience: values.experience,
      facebook: values.facebook,
    },
    paymentMethod: {
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      bankCode: values.bankCode,
    },
  };
  return axios.put("/profile/updated-profile", data);
};

export const getStudentOfTeacher = () => {
  return axios.get("/user/student");
};

export const revenueInstructor = () => {
  return axios.get("/user/revenue-instructor");
};

export const revenueTeachers = (id) => {
  return axios.get(`/user/${id}/sales`);
};

export const revenueTeacherByMonth = () => {
  return axios.get(`/user/reveneueInstructorByMonth`);
};

export const progressUser = (userId, courseId) => {
  return axios.get(`/user/progress/${userId}/${courseId}`);
};
