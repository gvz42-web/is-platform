const express = require("express");
const {
  get_user,
  user_login,
  check_test,
} = require("../controllers/userController");
const validateUserToken = require("../middlewares/validateUserToken");
const router = express.Router();

router.patch("/login", user_login);
router.get("/:id", validateUserToken, get_user);
router.post("/check", check_test);

module.exports = router;
