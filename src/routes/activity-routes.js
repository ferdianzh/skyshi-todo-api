const express = require('express');
const router = express.Router();

const activityServices = require('../services/activity-services');

router.post('/', async (req, res, next) => {
  try {
    const id = await activityServices.createActivity(req.body);
    res.json({
      status: 'success',
      message: 'activity created',
      data: await activityServices.getActivityById(id),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    message: 'fetch success',
    data: await activityServices.getActivities(),
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await activityServices.getActivityById(req.params.id);
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
    const data = await activityServices.updateActivity(req.params.id, req.body);
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
    const data = await activityServices.deleteActivity(req.params.id);
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
