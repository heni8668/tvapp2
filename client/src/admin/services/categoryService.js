import axios from "axios";

export const getCategories = async () => {
  const response = await axios.get(
    `https://tvapp2-2.onrender.com/api/categories/get-category`
  );
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(
    `https://tvapp2-2.onrender.com/api/categories/add-category`,
    category
  );
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.put(
    `https://tvapp2-2.onrender.com/api/categories/update-category/${id}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `https://tvapp2-2.onrender.com/api/categories/delete-category/${id}`
  );
  return response.data;
};
