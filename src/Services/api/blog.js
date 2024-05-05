import axios from "../request";

export const createBlog = (values) => {
  return axios.post("/blog/create", values);
};

export const getListBlog = () => {
  return axios.get("/blog/getAll");
};

export const getBlogById = (_id) => {
  return axios.get(`/blog/getby/${_id}`);
};

export const updateBlog = (_id, values) => {
  return axios.put(`/blog/${_id}`, values);
};

export const deleteBlog = (_id) => {
  return axios.delete(`/blog/${_id}`);
};

export const filterBlog = (values) => {
  const blogValues = {
    name: values.name,
    field: values.field,
    author: values.author,
  };
  return axios.post("/blog/filter", blogValues);
};
