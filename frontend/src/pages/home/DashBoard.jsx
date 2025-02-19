import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import TaskForm from '../../components/TaskForm'
import  '../home/dashboard.css'

const Dashboard = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const taskReports = await api.getTasks(token);
      setTasks(taskReports);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  const addTask = async (newTask) => {
    try {
      const createdTask = await api.createTask(newTask, token);
      setTasks([...tasks, createdTask]); // Add new task to the list
    } catch (error) {
      alert("Failed to add task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove from UI
    } catch (error) {
      alert("Failed to delete task.");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <TaskForm token={token} addTask={addTask} />

      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-item" key={task._id}>
            <strong>Date:</strong> {new Date(task.date).toLocaleDateString()}
            <br />
            <strong>Task:</strong> {task.taskDescription}
            <br />
            <strong>Hours Worked:</strong> {task.hoursWorked}
            <br />
            <strong>Status:</strong> {task.status}
            <br />
            <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
