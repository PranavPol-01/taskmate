import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tasksvg from "../assets/task-animate.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faFlag,
  faBell,
} from "@fortawesome/free-regular-svg-icons";
import Preloader from "../Components/Preloader";
import Navbar from './../Components/Navbar';
import { motion } from "framer-motion";


function LandingPage() {
  const [hasEmail, sethasEmail] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("username");
    sethasEmail(storedEmail);
  }, []);

  return (
    <>
      {" "}
      
      <div className="div">
        {!isLoaded && <Preloader setIsLoaded={setIsLoaded} />}
        {isLoaded && (
          <><Navbar />
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-1  ">
              <section className="bg-blue-100 py-20 lg:px-20">
                <div className="container mx-auto flex flex-col md:flex-row items-center ">
                  <div className="md:w-1/2 md:p-10 p-6">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                      Manage Your Tasks Efficiently with{" "}
                      <span className="text-sky-500">TaskMate</span>
                    </h2>
                    <p className="text-gray-600 mb-6">
                      TaskMate helps you stay organized, set priorities, and
                      keep track of your personal tasks. Whether it's a simple
                      to-do list or a detailed project, TaskMate has got you
                      covered.
                    </p>
                    {hasEmail ? (
                      <Link
                        to="/tasks"
                        className="bg-sky-500 text-white px-6 py-3 rounded-md shadow hover:bg-sky-600 transition"
                      >
                        Get Started
                      </Link>
                    ) : (
                      <Link
                        to="/signup"
                        className="bg-sky-500 text-white px-6 py-3 rounded-md shadow hover:bg-sky-600 transition"
                      >
                        Get Started
                      </Link>
                    )}
                  </div>
                  <div className="md:w-1/2 mt-10  md:mt-0">
                    {/* <img src={heroImage} alt="Task Management" className="w-full rounded-lg shadow-lg" /> */}
                    {/* <img src="https://images.unsplash.com/photo-1612830121557-6f3d3c3f5f8f" alt="Task Management" className="w-full rounded-lg shadow-lg" /> */}
                    <img
                      src={tasksvg}
                      alt="Task Management"
                      className="w-full "
                    />
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 ">
                  <h2 className="text-3xl flex justify-center font-bold text-gray-800 mb-12">
                    Features
                  </h2>
                  <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
                    <motion.div
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
                        // delay: index * 0.1,
                      },
                      animate: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    viewport={{ once: true }}>
                    <FeatureCard
                      title="Task Scheduling"
                      description="Easily schedule tasks and set deadlines to stay on track."
                      icon={
                        <FontAwesomeIcon
                          className="w-6 h-6"
                          icon={faCalendarCheck}
                        />
                      }
                      newProp="New Value"
                    />
                    </motion.div>
                    <motion.div
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
                        // delay: index * 0.1,
                      },
                      animate: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    viewport={{ once: true }}>
                    <FeatureCard
                      title="Priority Setting"
                      description="Set priorities to focus on what's important."
                      icon={
                        <FontAwesomeIcon className="w-6 h-6" icon={faFlag} />
                      }
                    />
                    </motion.div>
                    <motion.div
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
                        // delay: index * 0.1,
                      },
                      animate: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    viewport={{ once: true }}>
                    <FeatureCard
                      title="Reminders"
                      description="Get timely reminders for your tasks."
                      icon={
                        <FontAwesomeIcon className="w-6 h-6" icon={faBell} />
                      }
                    />
                    </motion.div>
                  </div>
                </div>
              </section>

              <section className="bg-blue-100 py-20">
                <div className="container mx-auto text-center px-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-12">
                    What Our Users Say
                  </h2>
                  <div className="flex flex-wrap justify-center">
                    <Testimonial
                      quote="TaskMate has completely transformed the way I manage my daily tasks. It's simple and effective!"
                      name="John Doe"
                      position="Freelancer"
                    />
                    <Testimonial
                      quote="I love using TaskMate for keeping track of my projects. The reminders help me stay on top of everything."
                      name="Jane Smith"
                      position="Software Developer"
                    />
                  </div>
                </div>
              </section>
            </main>

            <footer className="bg-gray-800 text-gray-400 py-6 text-center">
              <p>&copy; 2024 TaskMate. All rights reserved.</p>
            </footer>
          </div>
          </>
        )}
      </div>
    </>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className=" ">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center h-[13rem]">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-sky-500 text-white rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function Testimonial({ quote, name, position }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600 mb-4">"{quote}"</p>
        <h4 className="text-gray-800 font-semibold">{name}</h4>
        <p className="text-gray-600 text-sm">{position}</p>
      </div>
    </div>
  );
}

export default LandingPage;
