const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  superUser: { type: Boolean },
});

module.exports = mongoose.model("admin", adminSchema);
