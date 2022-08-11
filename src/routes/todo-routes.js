const express = require('express');
const router = express.Router();

const todoSertvices = require('../services/todo-services');

router.post('/', async (req, res, next) => {
  try {
    const id = await todoSertvices.createTodo(req.body);
    res.json({
      status: 'success',
      message: 'activity created',
      data: await todoSertvices.getTodoById(id),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    message: 'fetch success',
    data: await todoSertvices.getTodos(),
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await todoSertvices.getTodoById(req.params.id);
    res.json({
      status: 'success',
      message: 'fetch success',
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
      status: 'success',
      message: 'update success',
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await todoSertvices.deleteTodo(req.params.id);
    res.status(404).json({
      status: 'success',
      message: 'delete success',
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
