import axios from "axios";



export const getTypes = async () => {
  const response = await axios.get(`http://localhost:5000/api/types/get-type`);
  return response.data;
};

export const createType = async (type) => {
  const response = await axios.post(`http://localhost:5000/api/types/add-type`, type);
  return response.data;
};

export const updateType = async (id, type) => {
  const response = await axios.put(
    `http://localhost:5000/api/types/update-type/${id}`,
    type
  );
  return response.data;
};

export const deleteType = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/types/delete-type/${id}`);
  return response.data;
};
