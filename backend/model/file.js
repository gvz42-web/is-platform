const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  binary: { type: Buffer },
});

module.exports = mongoose.model("file", fileSchema);
