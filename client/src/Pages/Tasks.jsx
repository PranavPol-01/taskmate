import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NotFound from "./../Components/NotFound";
import Loader from './../Components/Loader';
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";


function Tasks() {
  const targetRef = useRef();
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState({ all: [], high: [], mid: [], low: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8800/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const tasksData = response.data.tasks;

        const highPriority = [];
        const mediumPriority = [];
        const lowPriority = [];
        const allTasks = [];

        const currentTime = new Date();

        tasksData.forEach((task) => {
          const endTime = new Date(task.end_time);
          const timeDiff = endTime.getTime() - currentTime.getTime();
          const hoursDiff = timeDiff / (1000 * 3600);
          if (endTime > currentTime) {
            allTasks.push(task);

            if (hoursDiff <= 12) {
              highPriority.push(task);
            } else if (hoursDiff <= 24) {
              mediumPriority.push(task);
            } else {
              lowPriority.push(task);
            }
          }
        });

        const inProgressHighPriority = highPriority.filter(
          (task) => task.status === "in progress"
        );
        const inProgressMediumPriority = mediumPriority.filter(
          (task) => task.status === "in progress"
        );
        const inProgressLowPriority = lowPriority.filter(
          (task) => task.status === "in progress"
        );
        const inProgressAllTasks = allTasks.filter(
          (task) => task.status === "in progress"
        );

        setTasks({
          all: inProgressAllTasks,
          high: inProgressHighPriority,
          mid: inProgressMediumPriority,
          low: inProgressLowPriority,
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8800/api/tasks/${taskId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleCheckboxChange = async (taskId) => {
    const updatedTasks = { ...tasks };

    const updateTasksArray = (tasksArray) =>
      tasksArray.filter((task) => {
        if (task._id === taskId) {
          updateTaskStatus(taskId, "completed");
          return false;
        }
        return true;
      });

    updatedTasks.all = updateTasksArray(tasks.all);
    updatedTasks.high = updateTasksArray(tasks.high);
    updatedTasks.mid = updateTasksArray(tasks.mid);
    updatedTasks.low = updateTasksArray(tasks.low);

    setTasks(updatedTasks);
  };

  if (loading) {
    return <Loader />;
  }


  const renderTasks = (tasksArray) => (
    <div className="bg-white text-grey-900 container px-5 py-10 mx-auto">
      {tasksArray.length === 0 ? (
        <NotFound />
      ) : (
        <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tasksArray.map((task,index) => (
              <motion.div key={task._id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileHover={{ scale: 1.05 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  delay: index * 0.1,
                },
                animate: {
                  opacity: 1,
                  y: 0,
                },
              }}
              viewport={{ once: true }}>
                <div className="block rounded-xl border border-gray-800 py-5 m-2 h-50 shadow-xl transition  hover:shadow-sky-500/10 relative">
                  <div className="inline-flex">
                    <div className="py-10 p-4 lg:px-5">
                      <label className="flex items-center  ">
                        <input
                          type="checkbox"
                          className="form-checkbox text-sky-500 h-4 w-4"
                          checked={task.status === "completed"}
                          onChange={() => handleCheckboxChange(task._id)}
                        />
                      </label>
                    </div>
                    <Link to={`/task/${task._id}`}>
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="text-lg font-bold  text-gray-900 sm:text-xl">
                            {task.title}
                          </h3>
                        </div>
                      </div>
                      <dl className="mt-6 flex gap-5 sm:gap-6">
                        <div className="flex flex-col-reverse flex-2">
                          <dt className="text-sm font-medium text-gray-600">
                            Start time
                          </dt>
                          <dd className="text-xs text-gray-500">
                            {new Date(task.start_time).toLocaleString()}
                          </dd>
                        </div>
                        <div className="flex flex-col-reverse flex-2">
                          <dt className="text-sm font-medium text-gray-600">
                            End time
                          </dt>
                          <dd className="text-xs text-gray-500">
                            {new Date(task.end_time).toLocaleString()}
                          </dd>
                        </div>
                      </dl>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (<><Navbar/>
    <div className="flex flex-col items-center" ref={targetRef}>
      <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center p-4 pt-7">
          My Tasks
        </h1>
        <fieldset className="flex flex-wrap gap-3 mb-3">
          <legend className="sr-only">Tab Options</legend>
          <div>
            <button
              className={`${
                activeTab === "all"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("all")}
            >
              All
            </button>
          </div>
          <div>
            <button
              className={`${
                activeTab === "high"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("high")}
            >
              High
            </button>
          </div>
          <div>
            <button
              className={`${
                activeTab === "mid"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("mid")}
            >
              Medium
            </button>
          </div>
          <div>
            <button
              className={`${
                activeTab === "low"
                  ? "bg-sky-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
              onClick={() => handleTabChange("low")}
            >
              Low
            </button>
          </div>
        </fieldset>
      </div>

      {activeTab === "all" && renderTasks(tasks.all)}
      {activeTab === "high" && renderTasks(tasks.high)}
      {activeTab === "mid" && renderTasks(tasks.mid)}
      {activeTab === "low" && renderTasks(tasks.low)}
      
    </div>
    </>
  );
}

export default Tasks;
