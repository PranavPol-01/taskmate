import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import tasksData from "../Task.json"; // Import your JSON file

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasksData.tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <div>Task not found.</div>;
  }

  const handleEdit = () => {
    alert("Edit functionality is not implemented yet.");
  };

  const handleDelete = () => {
    alert("Delete functionality is not implemented yet.");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center py-4">
          {task.title}
        </h1>
        <div className="border border-gray-300 rounded-lg p-4">
          <p className="mb-2"><strong>Description:</strong> {task.description}</p>
          <p className="mb-2"><strong>Start Time:</strong> {new Date(task.start_time).toLocaleString()}</p>
          <p className="mb-2"><strong>End Time:</strong> {new Date(task.end_time).toLocaleString()}</p>
          <div className="flex justify-around mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
