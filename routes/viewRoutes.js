const express = require("express");
const { getIndex, deleteTodo, postTodo } = require("../controllers/viewsController");
const router = express.Router();

// router.get('/', getIndex);

router.get('/', getIndex);
// router.post('/api/message', postTodo);

router
    .route('/:id')
    .delete(deleteTodo);    

module.exports = router;
