import { useState } from "react";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import HomePage from './Pages/HomePage';


import './App.css';
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import TaskForm from "./Pages/TaskForm";
import TaskDetail from "./Pages/TaskDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />

          
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
