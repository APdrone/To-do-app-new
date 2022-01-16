import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";

const InputForm = () => {
  const taskList = [
    { id: 1, task: "Create Theme" },
    { id: 2, task: "Work on wordpress" },
    { id: 3, task: "Organize office main department" },
  ];

  const [tasks, setTasks] = useState(taskList);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(false);

  const regex = /^[A-Za-z0-9 ]+$/;

  const handleInputChange = (e) => {
    if (e.target.value.length < 1 || !regex.test(e.target.value)) {
      setError(true);
      setTaskName(e.target.value);
    } else {
      setError(false);
      setTaskName(e.target.value);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    // console.log("regex ::", regex.test(e.target.value));
    if (taskName.length < 1 || !regex.test(taskName)) {
      setError(true);
      return;
    }
    const newTaskList = [...tasks];
    newTaskList.push({ id: Math.floor(Math.random() * 1000), task: taskName });
    setTasks(newTaskList);

    setTaskName("");
    // console.log(tasks);
  };

  const removeTask = (id) => {
    let newTaskList = [...tasks];

    newTaskList = newTaskList.filter((newTask) => newTask.id !== id);

    setTasks(newTaskList);
  };

  return (
    <div>
      <form onSubmit={handleInput} className="user-form">
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="New Task..."
            value={taskName}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn">
            Add
          </button>
        </div>
      </form>
      {error && (
        <span className="err">
          Error! Empty input and special characters are not allowed
        </span>
      )}
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.task}
              <button onClick={() => removeTask(task.id)}>
                <AiTwotoneDelete className="icon" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="no-task">{tasks.length === 0 ? "No Tasks..." : ""}</div>
    </div>
  );
};

export default InputForm;
