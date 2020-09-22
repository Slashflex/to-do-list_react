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

exports.postTodo = catchAsync(async (req, res, next) => {
 
  console.log('lol')
  
  await Todo.create({
    message: req.body.message
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todos = await Todo.findOneAndDelete(req.params.id);

  if (!todos) next('No document found with that ID');

  res.status(204).json({
    status: 'success',
    data: null
  })
});
