const express = require("express");
const {
  get_admins,
  get_admin,
  delete_admin,
  create_admin,
  admin_login,
} = require("../controllers/adminController");
const router = express.Router();

router.patch("/login", admin_login);
router.get("/", get_admins);
router.get("/:id", get_admin);
router.delete("/:id", delete_admin);
router.post("/", create_admin);
router.post("/:id/deletetest", delete_admin);

module.exports = router;
