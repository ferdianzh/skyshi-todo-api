const db = require('../config/db');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

async function createActivity({ email, title }) {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const result = await db.query(
    `INSERT INTO activities (email, title, created_at, updated_at)
    VALUES (?, ?, ?, ?)`,
    [email, title, createdAt, updatedAt],
  );

  if (!result.affectedRows) {
    throw new InvariantError('create activity failed');
  }

  return result.insertId;
}

async function getActivities() {
  const result = await db.query(
    `SELECT * FROM activities`,
  );

  return result;
}

async function getActivityById(id) {
  const result = await db.query(
    `SELECT * FROM activities WHERE id = ?`,
    [id],
  );

  if (!result[0]) {
    throw new NotFoundError(`activity with id ${id} not found`);
  }
  
  return result[0];
}

async function updateActivity(id, {email = "", title = ""}) {
  const updatedAt = new Date().toISOString();
  const activity = await getActivityById(id);

  !email ? email = activity.email: activity.email = email;
  !title ? title = activity.title: activity.title = title;

  const result = await db.query(
    `UPDATE activities
    SET email = ?, title = ?, updated_at = ?
    WHERE id = ?`,
    [email, title, updatedAt, id],
  );

  if (!result) {
    throw new NotFoundError(`activity with id ${id} not found`);
  }

  return activity;
}

async function deleteActivity(id) {
  const result = await db.query(
    `DELETE FROM activities WHERE id = ?`,
    [id],
  );

  if (!result.affectedRows) {
    throw new NotFoundError(`activity with id ${id} not found`);
  }

  return id;
}

module.exports = {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
