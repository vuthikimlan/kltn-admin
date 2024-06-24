import axios from "../request";

export const createCourse = (values) => {
  return axios.post("/course/create", values);
};
export const createPart = (_id, values) => {
  const data = {
    parts: [
      {
        partName: values.partName,
      },
    ],
  };
  return axios.post(`/course/${_id}/add-part`, data);
};
export const createLectures = (courseId, partId, values) => {
  const data = {
    lectureName: values.lectureName,
    descriptionLectures: values.descriptionLectures,
    video: values.video,
    document: values.document,
    isFree: values.isFree,
  };
  return axios.post(`/course/${courseId}/add-lectures/${partId}`, data);
};

export const getListCourse = () => {
  return axios.get("/course/getAll");
};

export const getCourseById = (_id) => {
  return axios.get(`/course/${_id}`);
};

export const updateCourse = (_id, values) => {
  const data = {
    name: values.name,
    description: values.description,
    detailsCourse: values.detailsCourse,
    image: values.image,
    field: values.field,
    topic: values.topic,
    price: values.price,
    lessonContent: values.lessonContent,
    conditionParticipate: values.conditionParticipate,
    object: values.object,
    level: values.level,
  };
  return axios.put(`/course/${_id}`, data);
};

export const updateLecturse = (courseId, partId, lectureId, values) => {
  const data = {
    lectureName: values.lectureName,
    descriptionLectures: values.descriptionLectures,
    video: values.video,
    document: values.document,
    isFree: values.isFree,
  };
  return axios.put(`/course/${courseId}/${partId}/${lectureId}`, data);
};
export const updatePart = (courseId, partId, values) => {
  const data = {
    partName: values.partName,
  };
  return axios.put(`/course/${courseId}/${partId}`, data);
};

export const deleteCourse = (_id) => {
  return axios.delete(`/course/${_id}`);
};
export const deletePart = (courseId, partId) => {
  return axios.delete(`/course/${courseId}/del-part/${partId} `);
};

export const deleteLecture = (courseId, partId, lectureId) => {
  return axios.delete(`/course/${courseId}/${partId}/${lectureId} `);
};

export const filterCourse = (values) => {
  const courseValues = {
    name: values.name,
    field: values.field,
    topic: values.topic,
    minPrice: values.minPrice,
    maxPrice: values.maxPrice,
    level: values.level,
  };
  return axios.post("/course/filter", courseValues);
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("file", file);
  return axios.post("/file/upload", formData);
};

export const approveCourse = (courseId) => {
  return axios.post(`/approve/approval-request/${courseId}`);
};

export const getApproveCourse = () => {
  return axios.get(`/approve/pending`);
};

export const isAcceptCourse = (requestId) => {
  const data = {
    status: "approved",
  };
  return axios.put(`/approve/updateStatus/${requestId}`, data);
};

export const rejectedCourse = (requestId) => {
  const data = {
    status: "rejected",
  };
  return axios.put(`/approve/updateStatus/${requestId}`, data);
};

export const getCourseAprroved = () => {
  return axios.get("/approve/approved");
};

export const getCourseRejected = () => {
  return axios.get("/approve/rejected");
};

export const applyDiscount = (courseId, values) => {
  return axios.post(`/course/${courseId}/apply-discount`, values);
};

export const cancelDiscount = (courseId) => {
  return axios.put(`/course/${courseId}/reset-discount`);
};

export const getAssignment = (id) => {
  return axios.get(`/course/assignments/${id}`);
};

export const createAssignment = (id, values) => {
  const data = {
    nameAssignment: values.nameAssignment,
    descriptionAssignment: values.descriptionAssignment,
    dueDate: values.dueDate,
  };
  return axios.post(`/course/${id}/assignments`, data);
};

export const updateAssignment = (courseId, assignmentId, values) => {
  const data = {
    nameAssignment: values.nameAssignment,
    descriptionAssignment: values.descriptionAssignment,
    dueDate: values.dueDate,
  };
  return axios.put(`/course/${courseId}/assignments/${assignmentId}`, data);
};

export const deleteAssignment = (courseId, assignmentId) => {
  return axios.delete(`/course/${courseId}/assignments/${assignmentId}`);
};

export const addQuestion = (courseId, assignmentId, values) => {
  const data = {
    questions: [
      {
        type: values.type,
        question: values.question,
        answer: values.answer,
        options: [
          {
            option: values.option,
            isCorrect: values.isCorrect,
          },
        ],
      },
    ],
  };
  return axios.put(`/course/${courseId}/assignments/${assignmentId}`, data);
};
export const updateQuestion = (courseId, assignmentId, optionId, values) => {
  const data = {
    questions: [
      {
        type: values.type,
        question: values.question,
        answer: values.answer,
        options: [
          {
            option: values.option,
            isCorrect: values.isCorrect,
          },
        ],
      },
    ],
  };
  return axios.put(
    `/course/${courseId}/assignments/${assignmentId}/questions/${optionId}`,
    data
  );
};

export const addOptions = (courseId, assignmentId, optionId, values) => {
  const data = {
    newOption: {
      option: values.option,
      isCorrect: values.isCorrect,
    },
  };
  return axios.put(
    `/course/${courseId}/assignments/${assignmentId}/questions/${optionId}`,
    data
  );
};

export const getQuestion = (courseId, assignmentId) => {
  return axios.get(`/course/assignments/${courseId}/question/${assignmentId}`);
};

export const deleteQuestion = (courseId, assignmentId, questionId) => {
  return axios.delete(
    `/course/${courseId}/assignments/${assignmentId}/questions/${questionId}`
  );
};
