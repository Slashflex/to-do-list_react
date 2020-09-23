const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");

router.get("/todos", async (req, res, next) => {
  // returns all data
  await Todo.find({}, "message")
    .then((data) => res.json(data[0]))
    .catch(next);
});

router.post("/todos", (req, res, next) => {
  // creats a todo
  if (req.body.message) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/todos/:id", (req, res, next) => {
  // delete a todo
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
