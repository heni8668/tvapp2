import axios from "axios";

export const getTypes = async () => {
  const response = await axios.get(
    `https://tvapp2-2.onrender.com/api/types/get-type`
  );
  return response.data;
};

export const createType = async (type) => {
  const response = await axios.post(
    `https://tvapp2-2.onrender.com/api/types/add-type`,
    type
  );
  return response.data;
};

export const updateType = async (id, type) => {
  const response = await axios.put(
    `https://tvapp2-2.onrender.com/api/types/update-type/${id}`,
    type
  );
  return response.data;
};

export const deleteType = async (id) => {
  const response = await axios.delete(
    `https://tvapp2-2.onrender.com/api/types/delete-type/${id}`
  );
  return response.data;
};
