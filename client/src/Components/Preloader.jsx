import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ setIsLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, [setIsLoaded]);

  const text = "Taskmate";

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      {isLoading ? (
        <motion.div
          className="preloader-content flex flex-col items-center"
          initial={{ opacity: 0, scale: 0, y: "50%" }}
          animate={{ opacity: 1, scale: 1.2, y: "0%" }}
          transition={{
            delay: 0.5,
            duration: 2.5,
            type: "spring",
            stiffness: 120,
            ease: "easeInOut",
          }}
          viewport={{ once: false }}
        >
          <motion.svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
            width="64px"
            height="64px"
            className="rounded-full w-80 h-80"
          >
            <g>
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                fill="none"
                stroke="#2faadc"
                strokeWidth="5"
                strokeMiterlimit="10"
                initial={{ strokeDashoffset: 188.4 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                strokeDasharray="188.4"
              />
              <motion.polyline
                fill="none"
                stroke="#2faadc"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                points="16,32 25,44 50,24"
                initial={{ strokeDashoffset: 75 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, delay: 2 }}
                strokeDasharray="75"
              />
            </g>
          </motion.svg>
          <div className="flex justify-center m-4">
          <motion.h1
            className="preloader-name text-white text-xl md:text-3xl lg:text-3xl ml-4 uppercase mx-auto flex justify-center"
            style={{ fontFamily: "BIZ UDPMincho, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 1,
              type: "tween",
              ease: "easeOut",
            }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 + index * 0.1 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          </div>
        </motion.div>
      ) : null}
    </div>
    
  );
};

export default Preloader;
