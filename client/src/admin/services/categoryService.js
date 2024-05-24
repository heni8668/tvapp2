import axios from "axios";

// const API_URL = "http://localhost:5000/api/categories"; // Adjust the URL as necessary

export const getCategories = async () => {
  const response = await axios.get(
    `http://localhost:5000/api/categories/get-category`
  );
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(
    `http://localhost:5000/api/categories/add-category`,
    category
  );
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.put(
    `http://localhost:5000/api/categories/update-category/${id}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/categories/delete-category/${id}`
  );
  return response.data;
};
