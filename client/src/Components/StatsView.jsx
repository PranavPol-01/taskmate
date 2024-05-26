import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import axios from 'axios';

function StatsView() {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [todayTasksCount, setTodayTasksCount] = useState(0);
  const [upcomingTasksCount, setUpcomingTasksCount] = useState(0);

  const completedCount = useMotionValue(0);
  const todayCount = useMotionValue(0);
  const upcomingCount = useMotionValue(0);

  const roundedCompleted = useTransform(completedCount, Math.round);
  const roundedToday = useTransform(todayCount, Math.round);
  const roundedUpcoming = useTransform(upcomingCount, Math.round);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://taskmate-1wwo.onrender.com/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const tasks = response.data.tasks;
        const today = new Date();
        const todayDateString = today.toISOString().split("T")[0];
        console.log("today",todayDateString)

        let todayTasks = 0;
        let completedTasks = 0;
        let upcomingTasks = 0;

        tasks.forEach((task) => {
          const taskStartDate = task.start_time.split("T")[0];
          const taskEndDate = task.end_time.split("T")[0];
          
          console.log(taskEndDate,taskEndDate === todayDateString)

          if (task.status === "completed") {
            completedTasks += 1;
          } else if (taskEndDate === todayDateString) {
            todayTasks += 1;
          } else if (taskEndDate > todayDateString) {
            upcomingTasks += 1;
          }
        });

        setTodayTasksCount(todayTasks);
        setCompletedTasksCount(completedTasks);
        setUpcomingTasksCount(upcomingTasks);

        const incrementValueCompleted = Math.ceil(completedTasks / 100);
        const incrementValueToday = Math.ceil(todayTasks / 100);
        const incrementValueUpcoming = Math.ceil(upcomingTasks / 100);

        for (let i = 0; i <= completedTasks; i += incrementValueCompleted) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          completedCount.set(i);
        }
        for (let i = 0; i <= todayTasks; i += incrementValueToday) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          todayCount.set(i);
        }
        for (let i = 0; i <= upcomingTasks; i += incrementValueUpcoming) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          upcomingCount.set(i);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <section className="text-gray-600 body-font  " >
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-3xl font-bold  sm:text-3xl py-2 text-sky-500">
            Statistical Overview
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <motion.div
            className="lg:w-1/4 md:w-1/2 p-4 w-full"
            initial={{ y: 30, scale: 1.05, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3, ease: "easeInOut" } }}
            whileInView={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            viewport={{ once: false }}
          >
            <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                Completed Tasks
              </h2>
              <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                <motion.span>{roundedCompleted}</motion.span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/4 md:w-1/2 p-4 w-full"
            initial={{ y: 30, scale: 1.05, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3, ease: "easeInOut" } }}
            whileInView={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            viewport={{ once: false }}
          >
            <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                Today's Tasks
              </h2>
              <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                <motion.span>{roundedToday}</motion.span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/4 md:w-1/2 p-4 w-full"
            initial={{ y: 30, scale: 1.05, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3, ease: "easeInOut" } }}
            whileInView={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            viewport={{ once: false }}
          >
            <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                Upcoming Tasks
              </h2>
              <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                <motion.span>{roundedUpcoming}</motion.span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StatsView;
