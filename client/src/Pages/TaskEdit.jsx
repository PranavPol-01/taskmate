import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: ''
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8800/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const fetchedTask = response.data;
        setTask({
          ...fetchedTask,
          start_time: formatDate(fetchedTask.start_time),
          end_time: formatDate(fetchedTask.end_time)
        });
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8800/api/tasks/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/task/${id}`);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="w-full ">
    <div className="flex  justify-center ">
      <div className="w-full max-w-screen-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center py-4">
          Edit Task
        </h1>
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              value={task.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
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
              value={task.start_time}
              onChange={handleChange}
              className="w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
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
              value={task.end_time}
              onChange={handleChange}
              className="w-full rounded border bg-gray-50 px-2 py-1 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-700"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default TaskEdit;

// Utility function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
