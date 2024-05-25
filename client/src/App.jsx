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
import TaskEdit from './Pages/TaskEdit';
import NotificationPage from './Pages/NotificationPage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const username = localStorage.getItem('username');
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={username} route="/login">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute user={username} route="/login">
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/taskform"
            element={
              <ProtectedRoute user={username} route="/login">
                <TaskForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute user={username} route="/login">
                <NotificationPage />
              </ProtectedRoute>
            }
          />
          
        
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/task/:id/edit" element={<TaskEdit />} />
          
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
