require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const adminUserRouter = require("./routes/adminUser");
const adminModuleRouter = require("./routes/adminModule");
const userUserRouter = require("./routes/userUser");
const userModuleRouter = require("./routes/userModule");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/user/module/list/:id", (req, res) => {
  console.log(req.body);
});

app.use("/admin/user", adminUserRouter);
app.use("/admin/module", adminModuleRouter);

app.use("/user/user", userUserRouter);
app.use("/user/module", userModuleRouter);

module.exports = app;
