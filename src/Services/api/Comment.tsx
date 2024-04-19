import axios from "../request";

export const deleteComment = (courseId: string, commentId: string) => {
  return axios.delete(`/comment/${courseId}/${commentId} `);
};
