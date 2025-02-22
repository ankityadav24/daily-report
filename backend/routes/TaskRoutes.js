const express = require('express');
const {createTaskReport,getTaskReports, deleteTaskReport}=require('../controller/TaskController');
const {authMiddleware}=require('../middleware/AuthMiddleware');
const router = express.Router();
router.use(authMiddleware);

router.post('/', createTaskReport);
router.get('/', getTaskReports);

router.delete('/:id', deleteTaskReport); 


module.exports = router;