import React, { useState, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar.jsx";

function Add() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState(null); // State for image preview
  const fileInputRef = useRef(null); // Ref to trigger file input

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create preview URL
    }
  };

  // Trigger file input on click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
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

        {/* Form Container */}
        <div className="w-full h-full bg-gray-900 px-4 md:px-[100px] text-gray-200 py-4 flex flex-col overflow-y-auto">
          <div className="w-full text-md font-semibold">
            <form className="w-full mx-auto">
              <div className="w-full h-full flex flex-col justify-between">
                {/* Image Upload (Top) */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    onClick={handleImageClick}
                    className="w-28 h-28 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden hover:border-gray-500 transition"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Upload</span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {/* Name */}
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-1 text-gray-300">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Father's Name */}
                <div className="mb-5">
                  <label
                    htmlFor="fatherName"
                    className="block mb-1 text-gray-300"
                  >
                    Father's Name:
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Phone */}
                <div className="mb-5">
                  <label htmlFor="phone" className="block mb-1 text-gray-300">
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    pattern="[0-9]{10}"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Phone */}
                <div className="mb-5">
                  <label
                    htmlFor="parentPhone"
                    className="block mb-1 text-gray-300"
                  >
                    Parent's Mobile Number:
                  </label>
                  <input
                    type="tel"
                    id="parentPhone"
                    pattern="[0-9]{10}"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Aadhar */}
                <div className="mb-5">
                  <label htmlFor="Aadhar" className="block mb-1 text-gray-300">
                    Aadhar Number:
                  </label>
                  <input
                    type="text"
                    id="Aadhar"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Address */}
                <div className="mb-5">
                  <label htmlFor="address" className="block mb-1 text-gray-300">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Seat Number */}
                <div className="mb-5">
                  <label
                    htmlFor="seatNumber"
                    className="block mb-1 text-gray-300"
                  >
                    Seat Number:
                  </label>
                  <input
                    type="number"
                    id="seatNumber"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Join Date */}
                <div className="mb-5">
                  <label
                    htmlFor="joinDate"
                    className="block mb-1 text-gray-300"
                  >
                    Join Date:
                  </label>
                  <input
                    type="date"
                    id="joinDate"
                    className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-fit px-8 py-1 rounded-full font-semibold border border-gray-700 bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
