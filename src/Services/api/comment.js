import axios from "../request";

export const deleteComment = (courseId, commentId) => {
  return axios.delete(`/comment/${courseId}/${commentId} `);
};
