import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let taskString = localStorage.getItem("tasks");
    if (taskString) {
      let tasks = JSON.parse(taskString);
      setTasks(tasks);
    }
  }, []);

  const saveToLS = (tasksToSave) => {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  };

  const handleAdd = () => {
    if (task.trim().length > 3) {
      const newTask = { id: uuidv4(), task: task.trim(), isCompleted: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask("");
      saveToLS(updatedTasks);
    } else {
      alert("Task must be at least 3 characters long.");
    }
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
    saveToLS(updatedTasks);
  };

  const handleEdit = (id) => {
    const selectedTask = tasks.find((item) => item.id === id);
    if (selectedTask) {
      setTask(selectedTask.task);
      const updatedTasks = tasks.filter((item) => item.id !== id);
      setTasks(updatedTasks);
      saveToLS(updatedTasks);
    }
  };

  const handleCheckbox = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTasks(updatedTasks);
    saveToLS(updatedTasks);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-2xl italic">
          tskP - Plan all your tasks in one place
        </h1>
        <div className="addTask my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <div className="flex gap-2">
          <input
            onChange={handleChange}
            value={task}
            type="text"
            className="w-full rounded-full px-5 py-1"
            placeholder="Enter your task here..."
          />
          <button
            onClick={handleAdd}
            disabled={task.trim().length <=2}
            className="bg-green-800 hover:bg-green-950 disabled:bg-gray-500 p-2 py-1 text-sm font-bold text-white rounded-full"
          >
            Save
          </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
          />
          <span>Show Finished</span>
        </div>
        <h2 className="text-lg font-bold">Your Tasks</h2>
        <div className="tasks">
          {tasks.length === 0 && <div className="m-5">No tasks to display</div>}
          {tasks.map(
            (item) =>
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="task flex md:w-1/2 my-3 justify-between items-center"
                >
                  <div className="flex gap-5 items-center">
                    <input
                      name={item.id}
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                    />
                    <div
                      className={`${
                        item.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.task}
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-800 hover:bg-red-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;