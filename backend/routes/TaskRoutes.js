const express = require('express');
const {createTaskReport,getTaskReports}=require('../controller/TaskController');
const authMiddleware=require('../middleware/AuthMiddleware');
const router = express.Router();

router.post('/tasks', authMiddleware, createTaskReport);
router.get('/tasks', authMiddleware, getTaskReports);

module.exports = router;