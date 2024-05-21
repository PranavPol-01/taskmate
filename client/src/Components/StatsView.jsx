
import React, { useState, useEffect } from "react";
// import { db } from "../Firebase/cofig"; 
// import { collection, getDocs } from "firebase/firestore";
import { motion, useMotionValue, useTransform } from "framer-motion"; 

function StatsView() {
  const [completedCampaignsCount, setCompletedCampaignsCount] = useState(0);
  const [todayCampaignsCount, setTodayCampaignsCount] = useState(0);
  const [upcomingCampaignsCount, setUpcomingCampaignsCount] = useState(0);

  const completedCount = useMotionValue(0);
  const todayCount = useMotionValue(0);
  const upcomingCount = useMotionValue(0);

  const roundedCompleted = useTransform(completedCount, Math.round);
  const roundedToday = useTransform(todayCount, Math.round);
  const roundedUpcoming = useTransform(upcomingCount, Math.round);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const today = new Date();
        const todayDateString = today.toISOString().split("T")[0];

        const campaignsCollectionRef = collection(db, "campaigns");
        const campaignsSnapshot = await getDocs(campaignsCollectionRef);

        let todayCampaigns = 0;
        let completedCampaigns = 0;
        let upcomingCampaigns = 0;

        campaignsSnapshot.forEach((doc) => {
          const date = doc.id;
          const count = doc.data().count || 0;

          if (date < todayDateString) {
            completedCampaigns += count;
          } else if (date === todayDateString) {
            todayCampaigns += count;
          } else {
            upcomingCampaigns += count;
          }
        });

        setTodayCampaignsCount(todayCampaigns);
        setCompletedCampaignsCount(completedCampaigns);
        setUpcomingCampaignsCount(upcomingCampaigns);

        // Slowly increment counts to the fetched values
        const incrementValueCompleted = Math.ceil(completedCampaigns / 100); 
        const incrementValueToday = Math.ceil(todayCampaigns / 100);
        const incrementValueUpcoming = Math.ceil(upcomingCampaigns / 100);
        
        for (let i = 0; i <= completedCampaigns; i += incrementValueCompleted) {
          await new Promise((resolve) => setTimeout(resolve, 60)); 
          completedCount.set(i);
        }
        for (let i = 0; i <= todayCampaigns; i += incrementValueToday) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          todayCount.set(i);
        }
        for (let i = 0; i <= upcomingCampaigns; i += incrementValueUpcoming) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          upcomingCount.set(i);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <section
        className="text-gray-600 body-font "
        style={{ background: "#E2F5D2" }}
      >
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            {/* <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">
              Waste Wise Web's
            </h2> */}
            <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl py-2">
              Statistical Overview
            </h1>
            {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-center">
              Waste Wise Web is committed to addressing environmental concerns
              by providing real-time and accurate statistics, fostering
              awareness, and contributing to solutions for a sustainable and
              eco-friendly future.
            </p> */}
          </div>
          <div className="flex flex-wrap justify-center">
            {/* <motion.div
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
              initial={{
                y: 30,
                scale:1.05,
                opacity: 0,
               }}
              whileHover={{
                scale: 1.05,
                y: -10, 
                transition: { duration: 0.3, ease: "easeInOut" } 
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                
                transition: {
                  duration: 0.5,
                  ease:"easeInOut"
                },
              }}
              viewport={{ once: false }}
            >
              <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                  Completed Campaigns
                </h2>
                <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                  <motion.span>{roundedCompleted}</motion.span>
                </p>
              </div>
            </motion.div> */}
            <motion.div
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
              initial={{
                y: 30,
                scale:1.05,
                opacity: 0,
               }}
              whileHover={{
                scale: 1.05,
                y: -10, 
                transition: { duration: 0.3, ease: "easeInOut" } 
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                
                transition: {
                  duration: 0.5,
                  ease:"easeInOut"
                },
              }}
              viewport={{ once: false }}
            >
              <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                  Completed
                </h2>
                <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                  <motion.span>{roundedToday}</motion.span>
                </p>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
              initial={{
                y: 30,
                scale:1.05,
                opacity: 0,
               }}
              whileHover={{
                scale: 1.05,
                y: -10, 
                transition: { duration: 0.3, ease: "easeInOut" } 
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                
                transition: {
                  duration: 0.5,
                  ease:"easeInOut"
                },
              }}
              viewport={{ once: false }}
            >
              <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                  In Progress 
                </h2>
                <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                  <motion.span>{roundedUpcoming}</motion.span>
                </p>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
              initial={{
                y: 30,
                scale:1.05,
                opacity: 0,
               }}
              whileHover={{
                scale: 1.05,
                y: -10, 
                transition: { duration: 0.3, ease: "easeInOut" } 
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                
                transition: {
                  duration: 0.5,
                  ease:"easeInOut"
                },
              }}
              viewport={{ once: false }}
            >
              <div className="px-8 py-6 border border-black rounded-lg shadow-md bg-white/40 text-center">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">
                  TO DO 
                </h2>
                <p className="leading-relaxed text-base mb-4 text-center text-xl md:text-4xl font-extrabold">
                  <motion.span>{roundedUpcoming}</motion.span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StatsView;
