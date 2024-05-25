import React, { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../Components/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loader from "./../Components/Loader";
import Navbar from "./../Components/Navbar";
import { motion } from "framer-motion";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8800/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8800/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="div">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-screen-md px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center py-4">
            Notifications
          </h1>
          {notifications.length === 0 ? (
            <NotFound />
          ) : (
            <ul className="">
              {notifications.map((notification, index) => (
                <motion.li
                  key={notification._id}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1,
                      delay: index * 0.1,
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  viewport={{ once: true }}
                  className=" flex items-center justify-between border border-gray-300 rounded-lg p-4  "
                >
                  <p className="mb-2">{notification.message}</p>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700  "
                    onClick={() => handleDelete(notification._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
