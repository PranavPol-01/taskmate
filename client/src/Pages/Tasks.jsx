// import React, { useEffect, useState, useRef } from "react";

// function Tasks() {
//   const targetRef = useRef();

//   return (
//     <div className="flex justify-center" ref={targetRef}>
//     <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 border-b border-gray-300">
//       <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl text-center pb-4">
//         My Tasks
//       </h1>
//       <fieldset className="flex flex-wrap gap-3 mb-3">
//         <legend className="sr-only">Tab Options</legend>

//         <div>
//           <button
//             className={`${
//               activeTab === "all"
//                 ? "bg-sky-500 text-white"
//                 : "text-gray-500 hover:text-gray-700"
//             } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
//             onClick={() => handleTabChange("all")}
//           >
//             All
//           </button>
//         </div>

//         <div>
//           <button
//             className={`${
//               activeTab === "high"
//                 ? "bg-sky-500 text-white"
//                 : "text-gray-500 hover:text-gray-700"
//             } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
//             onClick={() => handleTabChange("high")}
//           >
//             High
//           </button>
//         </div>

//         <div>
//           <button
//             className={`${
//               activeTab === "mid"
//                 ? "bg-sky-500 text-white"
//                 : "text-gray-500 hover:text-gray-700"
//             } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
//             onClick={() => handleTabChange("mid")}
//           >
//             Medium
//           </button>
//         </div>

//         <div>
//           <button
//             className={`${
//               activeTab === "low"
//                 ? "bg-sky-500 text-white"
//                 : "text-gray-500 hover:text-gray-700"
//             } px-3 py-2 rounded-md transition duration-100 w-[10rem]`}
//             onClick={() => handleTabChange("low")}
//           >
//             Low
//           </button>
//         </div>

       

      
//       </fieldset>
//     </div>
//   </div>

//   )
// }

// export default Tasks
import React from 'react'

function Tasks() {
  return (
    <div>Tasks</div>
  )
}

export default Tasks