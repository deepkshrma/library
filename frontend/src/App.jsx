import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import ActiveMembers from "./Pages/ActiveMembers/ActiveMembers";
import Add from "./Pages/Add/Add";
import OldMembers from "./Pages/OldMembers/OldMembers";
import DueFees from "./Pages/DueFees/DueFees";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ActiveMembers" element={<ActiveMembers />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Add/:id" element={<Add />} />
        <Route path="/OldMembers" element={<OldMembers />} />
        <Route path="/DueFees" element={<DueFees />} />
        <Route path="/Profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
