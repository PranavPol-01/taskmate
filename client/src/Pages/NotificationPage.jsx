import React, { useEffect, useState } from "react";
import axios from 'axios';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8800/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8800/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center py-4">
          Notifications
        </h1>
        {notifications.length === 0 ? (
          <p className="text-center">No notifications available</p>
        ) : (
          <ul className="border border-gray-300 rounded-lg p-4">
            {notifications.map(notification => (
              <li key={notification._id} className="mb-4">
                <p className="mb-2">{notification.message}</p>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                  onClick={() => handleDelete(notification._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
