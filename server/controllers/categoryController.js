const prisma = require("../prisma/client");
const { categorySchema } = require("../utils/validation");

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newCategory = await prisma.category.create({
      data: { name, status: status !== undefined ? status : true },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name, status },
    });
    res.json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
