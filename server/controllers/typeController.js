const prisma = require('../prisma/client');
const { typeSchema } = require('../utils/validation');

const getTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createType = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newType = await prisma.type.create({
      data: { name, status: status !== undefined ? status : true },
    });
    res.status(201).json(newType);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the type" });
  }
};


const updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const updatedType = await prisma.type.update({
      where: { id: Number(id) },
      data: { name, status },
    });
    res.json(updatedType);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the type" });
  }
};

const deleteType = async (req, res) => {
  try {
    await prisma.type.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).json({ message: 'Type deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTypes, createType, updateType, deleteType };
