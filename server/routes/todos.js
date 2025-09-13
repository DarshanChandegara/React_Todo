const express = require('express');
const { body } = require('express-validator');
const { getTodos, createTodo, updateTodo, deleteTodo, deleteAllTodos } = require('../controller/todo.controller');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all todos for authenticated user
router.route('/').get(auth, getTodos);

// Create a new todo
router.route('/').post([
  auth,
  body('title').isLength({ min: 1, max: 200 }).trim().escape()
], createTodo);

// Update a todo
router.route('/:id').put([auth ,
  body('title').optional().isLength({ min: 1, max: 200 }).trim().escape(),
  body('completed').optional().isBoolean()
], updateTodo);

// Delete a todo
router.route('/:id').delete(auth, deleteTodo);

// Delete all todos for user
router.route('/').delete(auth, deleteAllTodos);

module.exports = router;