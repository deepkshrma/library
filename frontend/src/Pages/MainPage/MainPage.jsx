import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar";
import image from "../../assets/WhatsApp Image 2024-11-01 at 18.33.03_af7fd66f.jpg";

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Header */}
      <header className="flex justify-between items-center bg-black/50 text-white px-6 py-4">
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
    </div>
  );
}

export default MainPage;
