import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar.jsx";
import guest from "../../assets/guest.png";
import { TiArrowBack } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { id } = useParams();
  const [memberData, setMemberData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${id}`);
        setMemberData(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchMember();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/remove/${id}`);
      navigate("/ActiveMembers"); // or wherever you want to redirect
    } catch (err) {
      console.error("Error removing member:", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const backButtonHandle = () => {
    if (location.pathname === `/Profile/${id}`) {
      navigate("/ActiveMembers");
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
            onClick={(id) => backButtonHandle(id)}
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
      {memberData ? (
        // 🔽🔽 Full Profile JSX below here 🔽🔽
        <div className="flex flex-col md:flex-row items-start mt-8 px-6 md:px-[100px] gap-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
            Profile
          </h2>

          {/* Profile Image + Seat Number */}
          <div className="flex w-full items-center gap-4 relative">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full border-2 border-gray-700 overflow-hidden">
              <img
                src={memberData.profileImage ? memberData.profileImage : guest}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Seat Number */}
            <div className="absolute top-0 right-0 bg-blue-900 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md">
              Seat #{memberData.seatNo}
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
                <span className="text-gray-400">{memberData.mobile}</span>
              </div>
              <hr className="text-gray-700" />
              <div className="grid grid-cols-[150px_auto] gap-15">
                <span className="font-semibold text-white whitespace-nowrap">
                  Parent's Mobile Number:
                </span>
                <span className="text-gray-400">{memberData.parentMobile}</span>
              </div>
              <hr className="text-gray-700" />
              <div className="grid grid-cols-[150px_auto] gap-15">
                <span className="font-semibold text-white">Aadhar Number:</span>
                <span className="text-gray-400">{memberData.aadharNo}</span>
              </div>
              <hr className="text-gray-700" />
              <div className="grid grid-cols-[150px_auto] gap-15">
                <span className="font-semibold text-white">Address:</span>
                <span className="text-gray-400">{memberData.address}</span>
              </div>
              <hr className="text-gray-700" />
              <div className="grid grid-cols-[150px_auto] gap-15">
                <span className="font-semibold text-white">Join Date:</span>
                <span className="text-gray-400">
                  {new Date(memberData.joinDate).toLocaleDateString("en-IN")}
                </span>
              </div>
              <hr className="text-gray-700" />
            </div>

            {/* Remove Button */}
            <div className="mt-7 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded shadow"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
