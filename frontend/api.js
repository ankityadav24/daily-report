import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data; 
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
  }
};


const getTasks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const createTask = async (task, token) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};


const deleteTask = async (taskId, token) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};


export default { login, getTasks, createTask, deleteTask };
