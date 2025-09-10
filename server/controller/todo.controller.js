const Todo = require('../models/Todo');

// Get all todos for authenticated user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    const todo = new Todo({
      title,
      user: req.user._id
    });

    await todo.save();
    await todo.populate('user', 'username');

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    await todo.populate('user', 'username');

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete all todos for user
const deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({ user: req.user._id });
    res.json({ message: 'All todos deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos
};
