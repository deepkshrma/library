import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

function DueFees() {
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

  const handleViewClick = () => {
    navigate("/Profile");
  };
  const backButtonHandle = () => {
    const from = location.state?.from;

    if (from) {
      navigate(from);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white relative">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-800 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <TiArrowBack
            size={30}
            className="text-white"
            onClick={backButtonHandle}
          />
          <h1 className="text-xl md:text-2xl font-bold">Pooja Library</h1>
        </div>
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
            Due Fees
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
                  <tr key={member.seatNo} className="border-b border-gray-700">
                    <td className="px-3 py-2 md:px-6 md:py-3">
                      {member.seatNo}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-3">{member.name}</td>
                    <td className="px-3 py-2 md:px-6 md:py-3 text-center">
                      <div className="flex justify-center gap-2">
                        {/* View button */}
                        <button
                          onClick={() => handleViewClick()}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                        >
                          View
                        </button>

                        {/* Paid button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded">
                          Paid
                        </button>

                        {/* Payment dropdown */}
                        <select className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded cursor-pointer focus:outline-none">
                          <option value="">Select</option>
                          <option value="cash">Cash</option>
                          <option value="online">Online Payment</option>
                        </select>
                      </div>
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

export default DueFees;
