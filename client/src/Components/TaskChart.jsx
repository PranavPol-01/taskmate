import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
  const calculatePriority = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const hoursDifference = (end - now) / (1000 * 60 * 60);
    if(end > now){
    if (hoursDifference <= 12) return "High";
    if (hoursDifference <= 24) return "Medium";
    return "Low";}
  };

  const taskPriorities = useMemo(() => {
    const priorities = { Low: 0, Medium: 0, High: 0 };
    tasks.filter(task => task.status === "in progress").forEach(task => {
      const priority = calculatePriority(task.end_time);
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
        text: 'Task Count by Priority (In Progress)',
      },
    },
  };

  return (
    <div className="container mx-auto mt-10 mb-10 flex justify-center flex-col ">
      <h1 className="text-3xl font-bold text-sky-500 sm:text-3xl py-2 flex justify-center">
            Task By Priority
          </h1>
      <div className="flex justify-center">
        <div className="lg:w-[70rem]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
