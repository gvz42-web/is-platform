const express = require("express");
const {
  get_users,
  get_user,
  delete_user,
  create_user,
  update_user,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", get_users);
router.get("/:id", get_user);
router.delete("/:id", delete_user);
router.post("/", create_user);
router.put("/:id", update_user);

module.exports = router;
