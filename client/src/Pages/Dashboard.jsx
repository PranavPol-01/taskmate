import React, { useEffect, useState } from 'react';
import StatsView from '../Components/StatsView';
import TaskChart from './../Components/TaskChart';
import TaskStatus from '../Components/TaskStatus';
import axios from 'axios';
import Navbar from './../Components/Navbar';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
        const response = await axios.get(`http://localhost:8800/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Username: username,
          }
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    
    <div>
      <div>
          <Navbar />
        </div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl py-2 text-center">Task Management Dashboard</h1>

      <StatsView />
      
      <TaskChart tasks={tasks} />
      <TaskStatus />
    </div>
  );
}

export default Dashboard;
