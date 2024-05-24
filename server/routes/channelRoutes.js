const express = require("express");
const {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelController");

const router = express.Router();

router.get("/get-channel", getChannels);
router.post("/add-channel", createChannel);
router.put("/update-channel/:id", updateChannel);
router.delete("/delete-channel/:id", deleteChannel);

module.exports = router;
