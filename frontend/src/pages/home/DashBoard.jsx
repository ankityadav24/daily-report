import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import TaskForm from "../../components/TaskForm";
import "../home/dashboard.css";

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
      setTasks([...tasks, createdTask]);
    } catch (error) {
      alert("Failed to add task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task._id !== taskId));
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
      <div className="dashboard-container">
        <div className="task-form-container">
          <TaskForm token={token} addTask={addTask} />
        </div>
        <div className="task-table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{new Date(task.date).toLocaleDateString()}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.hoursWorked}</td>
                  <td>{task.status}</td>
                  <td className="action-btns">
                    <button onClick={() => deleteTask(task._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
