
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
  // Function to determine the priority of a task based on the start time
  const calculatePriority = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const hoursDifference = (start - now) / (1000 * 60 * 60);

    if (hoursDifference <= 24) return "High";
    if (hoursDifference <= 48) return "Medium";
    return "Low";
  };

  // Categorize tasks based on their priority
  const taskPriorities = useMemo(() => {
    const priorities = { Low: 0, Medium: 0, High: 0 };
    tasks.forEach(task => {
      const priority = calculatePriority(task.start_time);
      priorities[priority]++;
    });
    return priorities;
  }, [tasks]);

  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: 'Task Count',
        data: [taskPriorities.Low, taskPriorities.Medium, taskPriorities.High],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Count by Priority',
      },
    },
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-bold text-center mb-4">Tasks by Priority</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskChart;
