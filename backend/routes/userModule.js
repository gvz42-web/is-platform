const express = require("express");
const {
  get_modules,
  list_modules,
  get_module,
} = require("../controllers/moduleController");
const router = express.Router();

router.get("/list", list_modules);
router.get("/", get_modules);
router.get("/:id", get_module);

module.exports = router;
