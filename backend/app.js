require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const adminUserRouter = require("./routes/adminUser");
const adminModuleRouter = require("./routes/adminModule");
const userUserRouter = require("./routes/userUser");
const userModuleRouter = require("./routes/userModule");
const adminRouter = require("./routes/admin");
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.get("/user/module/list/:id", (req, res) => {
  console.log(req.body);
});

app.use("/admin/user", adminUserRouter);
app.use("/admin/module", adminModuleRouter);

app.use("/user/user", userUserRouter);
app.use("/user/module", userModuleRouter);

app.use("/admin/control/", adminRouter);

module.exports = app;
