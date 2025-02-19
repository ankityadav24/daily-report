const mongoose = require('mongoose');

const taskReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  taskDescription: { type: String, required: true },
  hoursWorked: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('TaskReport', taskReportSchema);