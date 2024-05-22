import React from 'react'
import StatsView from '../Components/StatsView'
import tasksData from "../Task.json";
import TaskChart from './../Components/TaskChart';
import TaskStatus from '../Components/TaskStatus';



function Dashboard() {
  return (
    <div>
        <StatsView/>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl py-2 text-center">Task Management Dashboard</h1>
      <TaskChart tasks={tasksData.tasks} />
      <TaskStatus/>
    </div>
  )
}

export default Dashboard