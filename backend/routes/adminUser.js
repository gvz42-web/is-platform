const express = require("express");
const {
  get_users,
  get_user,
  delete_user,
  create_user,
  update_user,
  delete_test,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", get_users);
router.get("/:id", get_user);
router.delete("/:id", delete_user);
router.post("/", create_user);
router.put("/:id", update_user);
router.post("/:id/deletetest", delete_test);

module.exports = router;
