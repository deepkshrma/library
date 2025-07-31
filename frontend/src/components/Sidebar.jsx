import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out z-99`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleSidebar} className="text-white">
            ✖
          </button>
        </div>

        <ul className="p-4 space-y-4">
          <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            <Link to="/ActiveMembers">Active Members</Link>
          </li>
          <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            <Link to="/Add">Add Member</Link>
          </li>
          <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            <Link to="/DueFees">Due Fees</Link>
          </li>
          <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
            <Link to="/OldMembers">Old Members</Link>
          </li>
        </ul>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
