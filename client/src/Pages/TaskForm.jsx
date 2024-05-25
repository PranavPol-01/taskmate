import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TaskForm() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    status: "in progress"
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8800/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          const { title, description, start_time, end_time, status } = response.data;
          setTaskData({ title, description, start_time, end_time, status });
        })
        .catch(error => console.error("Error fetching task:", error));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskPayload = { ...taskData };
    console.log(taskPayload)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
     console.log(config)

      if (id) {
        await axios.put(`http://localhost:8800/api/tasks/${id}`, taskPayload, config);
        alert("Task updated successfully");
      } else {
        await axios.post("http://localhost:8800/api/tasks", taskPayload, config);
        alert("Task created successfully");
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        config: error.config,
        request: error.request,
        response: error.response,
      });

      if (error.response) {
        alert(`Error: ${error.response.data.message || error.response.data || "Unknown error"}`);
      } else if (error.request) {
        alert("Error: No response received from the server. Please try again later.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="bg-blue-100  py-6 sm:py-8 lg:py-12 mx-2 md:mx-4">
      <div className="mx-auto max-w-screen-md">
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-800 md:mb-6 lg:text-4xl">
            {id ? "Edit Task" : "Create New Task"}
          </h2>
          <form
            className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2 mt-4"
            onSubmit={handleSubmit}
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Title
              </label>
              <input
                name="title"
                value={taskData.title}
                onChange={handleChange}
                className="w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Description
              </label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                className="h-40 w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="start_time"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Start Time
              </label>
              <input
                type="datetime-local"
                name="start_time"
                value={taskData.start_time}
                onChange={handleChange}
                className="w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="end_time"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                End Time
              </label>
              <input
                type="datetime-local"
                name="end_time"
                value={taskData.end_time}
                onChange={handleChange}
                className="w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            {/* <div className="sm:col-span-2">
              <label
                htmlFor="status"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Status
              </label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              >
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="missed">Missed</option>
                <option value="deleted">Deleted</option>
              </select>
            </div> */}
            <div className="flex items-center justify-between sm:col-span-2 mt-4">
              <button
                type="submit"
                className="inline-block rounded-lg bg-green-500 px-6 py-3 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base"
              >
                {id ? "Update Task" : "Create Task"}
              </button>
              <span className="text-sm text-gray-500">*Required</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
