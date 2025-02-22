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

const deleteTaskReport = async (req, res) => {
  const { id } = req.params; // Assuming the ID is passed as a URL parameter

  try {
    const taskReport = await TaskReport.findByIdAndDelete(id);

    if (!taskReport) {
      return res.status(404).json({ message: 'Task report not found' });
    }

    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task report', error });
  }
};

 
module.exports = { createTaskReport, getTaskReports,deleteTaskReport,};