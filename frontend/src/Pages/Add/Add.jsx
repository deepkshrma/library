import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar.jsx";
import axios from "axios";
import { TiArrowBack } from "react-icons/ti";

function Add() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    parentMobile: "",
    aadharNo: "",
    address: "",
    seatNo: "",
    monthlyFee: "",
    joinDate: "",
    profileImage: "", // will be used for preview
  });

  // Load existing data if editing
  useEffect(() => {
    if (id) {
      const fetchMember = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/students/${id}`
          );
          const data = res.data;
          setFormData({
            name: data.name || "",
            fatherName: data.fatherName || "",
            mobile: data.mobile || "",
            parentMobile: data.parentMobile || "",
            aadharNo: data.aadharNo || "",
            address: data.address || "",
            seatNo: data.seatNo || "",
            monthlyFee: data.monthlyFee || "",
            joinDate: data.joinDate ? data.joinDate.split("T")[0] : "",
            profileImage: data.profileImage || "",
          });

          if (data.profileImage) setImage(data.profileImage); // Show existing image
        } catch (err) {
          console.error("Failed to fetch member", err);
        }
      };
      fetchMember();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can later upload to server or handle base64
      setImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      status: "paid", // Default or keep same during update
    };

    try {
      if (id) {
        // UPDATE
        await axios.patch(
          `http://localhost:5000/api/students/${id}`,
          dataToSend
        );
        alert("Member updated successfully!");
      } else {
        // ADD NEW
        await axios.post("http://localhost:5000/api/students", dataToSend);
        alert("Member added successfully!");
        setFormData({
          name: "",
          fatherName: "",
          mobile: "",
          parentMobile: "",
          aadharNo: "",
          address: "",
          seatNo: "",
          monthlyFee: "",
          joinDate: "",
          profileImage: "",
        });
        setImage(null);
      }

      navigate("/ActiveMembers");
    } catch (error) {
      console.error("Error saving member:", error);
      alert(error.response?.data?.error || "Something went wrong");
    }
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

      {/* Form Container */}
      <div className="w-full h-full bg-gray-900 px-4 md:px-[100px] text-gray-200 py-4 flex flex-col overflow-y-auto">
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
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
              name="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          {[
            ["name", "Name"],
            ["fatherName", "Father's Name"],
            ["mobile", "Mobile Number"],
            ["parentMobile", "Parent's Mobile Number"],
            ["aadharNo", "Aadhar Number"],
            ["address", "Address"],
            ["seatNo", "Seat Number"],
            ["monthlyFee", "Monthly Fee (₹)"],
          ].map(([name, label]) => (
            <div className="mb-5" key={name}>
              <label htmlFor={name} className="block mb-1 text-gray-300">
                {label}:
              </label>
              <input
                type={
                  name.includes("mobile") || name.includes("No")
                    ? "tel"
                    : "text"
                }
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
              />
            </div>
          ))}

          {/* Join Date */}
          <div className="mb-5">
            <label htmlFor="joinDate" className="block mb-1 text-gray-300">
              Join Date:
            </label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleInputChange}
              className="w-full rounded bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500 px-2 py-1 text-sm text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-fit px-8 py-1 rounded-full font-semibold border border-gray-700 hover:bg-gray-600 bg-blue-900 text-white transition-all duration-300"
          >
            {id ? "Update Member" : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
