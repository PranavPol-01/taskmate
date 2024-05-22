import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import tasksData from "../Task.json"; // Import your JSON file

function TaskStatus() {
  const targetRef = useRef();
  const [activeTab, setActiveTab] = useState("missed");
  const [tasks, setTasks] = useState({ missed: [], completed: [], deleted: [] });

  useEffect(() => {
    const missedTasks = [];
    const completedTasks = [];
    const deletedTasks = [];

    const currentTime = new Date();

    tasksData.tasks.forEach((task) => {
      const endTime = new Date(task.end_time);

      // Example: Task is missed if end_time is in the past
      if (endTime < currentTime) {
        missedTasks.push(task);
      } else if (task.status === "completed") {
        completedTasks.push(task); // Example: Task has a status of completed
      } else if (task.status === "deleted") {
        deletedTasks.push(task); // Example: Task has a status of deleted
      }
    });

    setTasks({
      missed: missedTasks,
      completed: completedTasks,
      deleted: deletedTasks,
    });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTasks = (tasks) => {
    return (
      <div className="bg-white text-grey-900 container px-5 py-10 mx-auto">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Link to={`/task/${task.id}`} key={task.id}>
                  <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10 relative">
                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                          {task.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-600">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-pretty text-sm text-gray-500">
                        {task.description}
                      </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6 pb-4">
                      <div className="flex flex-col-reverse flex-1">
                        <dt className="text-sm font-medium text-gray-600">
                          Start time
                        </dt>
                        <dd className="text-xs text-gray-500">
                          {new Date(task.start_time).toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex flex-col-reverse flex-1">
                        <dt className="text-sm font-medium text-gray-600">
                          End time
                        </dt>
                        <dd className="text-xs text-gray-500">
                          {new Date(task.end_time).toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center" ref={targetRef}>
      <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center pb-4">
          Task Status
        </h1>
        <fieldset className="flex flex-wrap gap-3 mb-3">
          <legend className="sr-only">Tab Options</legend>

          <div>
            <button
              className={`${
                activeTab === "missed"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("missed")}
            >
              Missed
            </button>
          </div>

          <div>
            <button
              className={`${
                activeTab === "completed"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("completed")}
            >
              Completed
            </button>
          </div>

          <div>
            <button
              className={`${
                activeTab === "deleted"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("deleted")}
            >
              Deleted
            </button>
          </div>
        </fieldset>
      </div>

      {activeTab === "missed" && renderTasks(tasks.missed)}
      {activeTab === "completed" && renderTasks(tasks.completed)}
      {activeTab === "deleted" && renderTasks(tasks.deleted)}
    </div>
  );
}

export default TaskStatus;
