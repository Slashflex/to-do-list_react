const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
