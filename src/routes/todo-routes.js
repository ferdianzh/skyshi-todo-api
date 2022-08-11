const express = require('express');
const router = express.Router();

const todoSertvices = require('../services/todo-services');

router.post('/', async (req, res, next) => {
  try {
    const id = await todoSertvices.createTodo(req.body);
    res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: await todoSertvices.getTodoById(id),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  res.json({
    status: 'Success',
    message: 'Success',
    data: await todoSertvices.getTodos(),
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await todoSertvices.getTodoById(req.params.id);
    res.json({
      status: 'Success',
      message: 'Success',
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const data = await todoSertvices.updateTodo(req.params.id, req.body);
    res.json({
      status: 'Success',
      message: 'Success',
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await todoSertvices.deleteTodo(req.params.id);
    res.json({
      status: 'Success',
      message: 'Success',
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
