import { useState } from "react";
import '../components/taskform.css';

const TaskForm = ({ token, addTask }) => {
  const [task, setTask] = useState({
    date: "",
    taskDescription: "",
    hoursWorked: "",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(task);
      setTask({ date: "", taskDescription: "", hoursWorked: "", status: "Pending" });
      alert("Task Added Successfully");
    } catch (error) {
      alert("Failed to add task.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="date"
        value={task.date}
        onChange={(e) => setTask({ ...task, date: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={task.taskDescription}
        onChange={(e) =>
          setTask({ ...task, taskDescription: e.target.value })
        }
        required
      />
      <input
        type="number"
        placeholder="Hours Worked"
        value={task.hoursWorked}
        onChange={(e) =>
          setTask({ ...task, hoursWorked: e.target.value })
        }
        min="1"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
