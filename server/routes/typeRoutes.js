const express = require("express");
const {
  getTypes,
  createType,
  updateType,
  deleteType,
} = require("../controllers/typeController");

const router = express.Router();

router.get("/get-type", getTypes);
router.post("/add-type", createType);
router.put("/update-type/:id", updateType);
router.delete("/delete-type/:id", deleteType);

module.exports = router;
