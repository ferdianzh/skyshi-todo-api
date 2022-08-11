const db = require('../config/db');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

async function createTodo({ activity_group_id, title, is_active = 1, priority = 'normal'}) {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  
  is_active = is_active ? 1 : 0;

  const result = await db.query(
    `INSERT INTO todos (activity_group_id, title, is_active, priority, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [activity_group_id, title, is_active, priority, createdAt, updatedAt],
  );

  if (!result.affectedRows) {
    throw new InvariantError('create todo failed');
  }

  return result.insertId;
}

async function getTodos() {
  const result = await db.query(
    `SELECT * FROM todos`,
  );

  return result;
}

async function getTodoById(id) {
  const result = await db.query(
    `SELECT * FROM todos WHERE id = ?`,
    [id],
  );

  if (!result[0]) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }
  
  return result[0];
}

async function updateTodo(id, { activity_group_id, title, is_active, priority }) {
  const updatedAt = new Date().toISOString();
  const todo = await getTodoById(id);

  !activity_group_id
    ? activity_group_id = todo.activity_group_id
    : todo.activity_group_id = activity_group_id;
  !title ? title = todo.title: todo.title = title;
  !is_active ? is_active = todo.is_active: todo.is_active = is_active;
  !priority ? priority = todo.priority: todo.priority = priority;

  const result = await db.query(
    `UPDATE todos
    SET activity_group_id = ?, title = ?, is_active = ?, priority = ?, updated_at = ?
    WHERE id = ?`,
    [activity_group_id, title, is_active, priority, updatedAt, id],
  );

  if (!result) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }

  return todo;
}

async function deleteTodo(id) {
  const result = await db.query(
    `DELETE FROM todos WHERE id = ?`,
    [id],
  );

  if (!result.affectedRows) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }

  return id;
}

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
