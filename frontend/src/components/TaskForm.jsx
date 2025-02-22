import { useState } from "react";
import '../components/taskform.css';

const TaskForm = ({addTask }) => {
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
            <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        required
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
