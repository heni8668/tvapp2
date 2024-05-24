const express = require("express");
const {
  registerUser,
  loginUser,
  check,
  addToWatchLater,
  addToFavorites,
  searchAndFilter,
  removeFromWatchLater,
  removeFromFavorites,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
//check user
router.get("/check", authMiddleware, check);
router.post("/watch-later", addToWatchLater);
router.post("/favorites", addToFavorites);
router.get("/search", searchAndFilter);
router.delete("/watch-later/remove", removeFromWatchLater);
router.delete("/favorites/remove", removeFromFavorites);

module.exports = router;
