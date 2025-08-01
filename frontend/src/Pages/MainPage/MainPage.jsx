// import React, { useState } from "react";
// import { Bars3Icon } from "@heroicons/react/24/outline";
// import Sidebar from "../../components/Sidebar";
// import image from "../../assets/WhatsApp Image 2024-11-01 at 18.33.03_af7fd66f.jpg";

// function MainPage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center relative overflow-y-auto"
//       style={{ backgroundImage: `url(${image})` }}
//     >
//       {/* Header */}
//       <header className="flex justify-between items-center bg-black/50 text-white px-6 py-4">
//         <h1 className="text-2xl font-bold">Pooja Library</h1>
//         <button
//           onClick={toggleSidebar}
//           className="p-2 hover:bg-white/20 rounded"
//         >
//           <Bars3Icon className="h-6 w-6 text-white" />
//         </button>
//       </header>

//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//     </div>
//   );
// }

// export default MainPage;

import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar";
import image from "../../assets/WhatsApp Image 2024-11-01 at 18.33.03_af7fd66f.jpg";
import { useNavigate } from "react-router-dom";
function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative overflow-y-auto"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center bg-black/50 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Pooja Library</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/20 rounded"
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 3 Full-Width Divs */}
      <main className="relative z-10 flex flex-col items-center justify-start h-[calc(100%-64px)] px-4">
        <div className="w-full max-w-4xl space-y-4">
          {/* Section 1 */}
          <div
            onClick={() => navigate("/ActiveMembers")}
            className="w-full bg-violet-900/80 text-white py-5 px-6 text-left rounded-lg shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-bold mb-2">Active Members</h2>
          </div>

          {/* Section 2 */}
          <div
            onClick={() => navigate("/DueFees")}
            className="w-full bg-yellow-900/80 text-white py-5 px-6 text-left rounded-lg shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-bold mb-2">Due Fees</h2>
          </div>

          {/* Section 3 */}
          <div
            onClick={() => navigate("/Add")}
            className="w-full bg-green-900/80 text-white py-5 px-6 text-left rounded-lg shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-bold mb-2">Add Members</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
