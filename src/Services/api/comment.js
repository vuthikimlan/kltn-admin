import axios from "../request";

export const deleteComment = (courseId, commentId) => {
  return axios.delete(`/comment/${courseId}/${commentId} `);
};

export const getComment = (courseId) => {
  return axios.get(`/comment/${courseId}`);
};

export const replyCourse = (idComment, values) => {
  console.log("idComment", idComment);
  const id = idComment?.idComment;
  return axios.post(`/comment/reply/${id}`, values);
};
