const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  tests: [
    {
      test_id: String,
      score: Number,
      exercises: [Number],
      time_start: Date,
      time_end: Date,
    },
  ],
  comments: [
    {
      author_id: String,
      text: String,
      time: Date,
    },
  ],
  user_tags: [String],
});

module.exports = mongoose.model("user", userSchema);
