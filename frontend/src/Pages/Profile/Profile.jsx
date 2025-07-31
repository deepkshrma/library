import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar.jsx";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Example profile data
  const memberData = {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    fatherName: "Michael Doe",
    phone: "9876543210",
    parentPhone: "9876543210",
    aadhar: "232345454343",
    address: "123 Main Street, City",
    seatNumber: "12",
    joinDate: "2025-07-20",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

      {/* Profile Content */}
      <div className="flex flex-col md:flex-row items-start mt-8 px-6 md:px-[100px] gap-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Profile</h2>

        {/* Profile Image + Seat Number */}
        <div className="flex w-full items-center gap-4 relative">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full border-2 border-gray-700 overflow-hidden">
            <img
              src={memberData.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Seat Number */}
          <div className="absolute top-0 right-[35%] bg-blue-900 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md">
            Seat #{memberData.seatNumber}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col justify-center w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">{memberData.name}</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-[150px_auto] gap-15">
              <span className="font-semibold text-white">Father's Name:</span>
              <span className="text-gray-400">{memberData.fatherName}</span>
            </div>
            <hr className="text-gray-700" />
            <div className="grid grid-cols-[150px_auto] gap-15">
              <span className="font-semibold text-white">Mobile Number:</span>
              <span className="text-gray-400">{memberData.phone}</span>
            </div>
            <hr className="text-gray-700" />
            <div className="grid grid-cols-[150px_auto] gap-15">
              <span className="font-semibold text-white whitespace-nowrap">
                Parent's Mobile Number:
              </span>
              <span className="text-gray-400">{memberData.parentPhone}</span>
            </div>
            <hr className="text-gray-700" />
            <div className="grid grid-cols-[150px_auto] gap-15">
              <span className="font-semibold text-white">Aadhar Number:</span>
              <span className="text-gray-400">{memberData.aadhar}</span>
            </div>
            <hr className="text-gray-700" />
            <div className="grid grid-cols-[150px_auto] gap-15">
              <span className="font-semibold text-white">Address:</span>
              <span className="text-gray-400">{memberData.address}</span>
            </div>
            <hr className="text-gray-700" />
            <div className="grid grid-cols-[150px_auto] gap-15">
              <span className="font-semibold text-white">Join Date:</span>
              <span className="text-gray-400">{memberData.joinDate}</span>
            </div>
            <hr className="text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
