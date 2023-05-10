const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: { type: String, default: "Модуль" },
  image: String,
  description: {
    short: {
      type: String,
      default: null,
    },
    full: {
      type: String,
      default: null,
    },
    admin: {
      type: String,
      default: null,
    },
  },
  list: [
    {
      partType: String,
      data: String,
    },
  ],
  minimalScore: Number,
  module_tags: [String],
});

module.exports = mongoose.model("module", moduleSchema);
