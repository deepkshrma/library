import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar.jsx";
import { FaChevronRight } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

function ActiveMembers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [members] = useState([
    { seatNo: 101, name: "John Doe" },
    { seatNo: 102, name: "Priya Sharma" },
    { seatNo: 103, name: "Amit Kumar" },
  ]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRightClick = () => {
    // alert(`Action for Seat No: ${seatNo}`);
    navigate("/Profile");
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white relative">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-800 px-4 py-3 md:px-6 md:py-4">
        <h1 className="text-xl md:text-2xl font-bold">Pooja Library</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="p-4 md:p-6 relative z-10">
        <div className="bg-gray-800 rounded-lg shadow-md p-3 md:p-4">
          {/* Table Heading */}
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Active Members
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg text-sm md:text-base">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left">
                    Seat No.
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left">Name</th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.seatNo} className="border-b border-gray-700 ">
                    <td className="px-3 py-2 md:px-6 md:py-3">
                      {member.seatNo}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-3">{member.name}</td>
                    <td className="px-3 py-2 md:px-6 md:py-3 text-center flex justify-center">
                      <FaChevronRight
                        onClick={() => handleRightClick()}
                        className="text-gray-300 hover:text-gray-400 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveMembers;
