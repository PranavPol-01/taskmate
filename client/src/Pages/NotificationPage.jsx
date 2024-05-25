import React, { useEffect, useState } from "react";
import axios from 'axios';
import NotFound from "../Components/NotFound";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Loader from './../Components/Loader';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


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
      }finally {
        setLoading(false);
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
    }finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center py-4">
          Notifications
        </h1>
        {notifications.length === 0 ? (
          <NotFound/>
        ) : (
          <ul className="border border-gray-300 rounded-lg p-4 ">
            {notifications.map(notification => (
              <li key={notification._id} className=" flex items-center justify-between ">
                <p className="mb-2">{notification.message}</p>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700  "
                  onClick={() => handleDelete(notification._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
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
