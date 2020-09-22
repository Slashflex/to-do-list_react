const path = require("path");
const catchAsync = require('../utils/catchAsync');
const Todo = require('../models/todoModel');

exports.getIndex = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();

  res.render("index", {
    todos,
    title: "To do list React"
  });
});
