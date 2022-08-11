const express = require('express');
const router = express.Router();

const activityServices = require('../services/activity-services');

router.post('/', async (req, res, next) => {
  try {
    const id = await activityServices.createActivity(req.body);
    res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: await activityServices.getActivityById(id),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  res.json({
    status: 'Success',
    message: 'Success',
    data: await activityServices.getActivities(),
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await activityServices.getActivityById(req.params.id);
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
    const data = await activityServices.updateActivity(req.params.id, req.body);
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
    const data = await activityServices.deleteActivity(req.params.id);
    res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
