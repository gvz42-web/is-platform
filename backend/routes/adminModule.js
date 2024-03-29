const express = require("express");
const {
  get_modules,
  list_modules,
  delete_module,
  create_module,
  update_module,
} = require("../controllers/moduleController");
const router = express.Router();

router.get("/", get_modules);

router.get("/list", list_modules);
router.delete("/:id", delete_module);
router.post("/", create_module);
router.put("/:id", update_module);

// file upload

const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.resolve(__dirname, "../files") });

module.exports = router;
