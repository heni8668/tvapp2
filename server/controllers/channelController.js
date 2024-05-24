const prisma = require("../prisma/client");
const { channelSchema } = require("../utils/validation");

const getChannels = async (req, res) => {
  try {
    const channels = await prisma.channel.findMany();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createChannel = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newChannel = await prisma.channel.create({
      data: { name, status: status !== undefined ? status : true },
    });
    res.status(201).json(newChannel);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the channel" });
  }
};

const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const updatedChannel = await prisma.channel.update({
      where: { id: Number(id) },
      data: { name, status },
    });
    res.json(updatedChannel);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the channel" });
  }
};

const deleteChannel = async (req, res) => {
  try {
    await prisma.channel.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).json({ message: "Channel deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getChannels, createChannel, updateChannel, deleteChannel };
