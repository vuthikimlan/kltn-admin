import axios from "../request";

export const getListField = () => {
  return axios.get("/field/getAll");
};

export const getFieldById = (fieldId) => {
  return axios.get(`/field/detail/${fieldId}`);
};

export const createField = (values) => {
  return axios.post("/field/create", values);
};

export const createTopic = (fieldId, values) => {
  const data = {
    topics: [
      {
        nameTopic: values.nameTopic,
      },
    ],
  };
  return axios.post(`/field/${fieldId}/add-topic`, data);
};

export const updateField = (fieldId, values) => {
  return axios.put(`/field/${fieldId}`, values);
};

export const updateTopic = (fieldId, topicId, values) => {
  const data = {
    nameTopic: values.nameTopic,
  };
  return axios.put(`/field/${fieldId}/${topicId}`, data);
};

export const deleteField = (fieldId) => {
  return axios.delete(`/field/${fieldId}`);
};

export const deleteTopic = (fieldId, topicId) => {
  return axios.delete(`/field/${fieldId}/${topicId}`);
};
