const TaskReport = require('../models/TaskReport');

const createTaskReport = async (req, res) => {
  const { date, taskDescription, hoursWorked, status } = req.body;
  const taskReport = new TaskReport({ userId: req.userId, date, taskDescription, hoursWorked, status });
  await taskReport.save();
  res.status(201).json(taskReport);
};

const getTaskReports = async (req, res) => {
  const taskReports = await TaskReport.find({ userId: req.userId });
  res.json(taskReports);
};

module.exports = { createTaskReport, getTaskReports };