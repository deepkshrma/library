// import StudentForm from "./components/StudentForm";
// import StudentList from "./components/StudentList";
// import { useState } from "react";

// function App() {
//   const [refresh, setRefresh] = useState(false);

//   const refreshList = () => {
//     setRefresh(!refresh);
//   };

//   return (
//     <div>
//       <h1>Pooja Library App 📚</h1>
//       <StudentForm onStudentAdded={refreshList} />
//       <StudentList key={refresh} />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import ActiveMembers from "./Pages/ActiveMembers/ActiveMembers";
import Add from "./Pages/Add/Add";
import OldMembers from "./Pages/OldMembers/OldMembers";
import DueFees from "./Pages/DueFees/DueFees";
import Profile from "./Pages/Profile/Profile";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshList = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      {/* <div>
        <h1>Pooja Library App 📚</h1> */}

      {/* Navigation */}
      {/* <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Student List</Link>
          <Link to="/add">Add Student</Link>
        </nav> */}

      {/* Routes */}
      <Routes>
        {/* <Route path="/" element={<StudentList key={refresh} />} />
          <Route path="/add" element={<StudentForm onStudentAdded={refreshList} />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/ActiveMembers" element={<ActiveMembers />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/OldMembers" element={<OldMembers />} />
        <Route path="/DueFees" element={<DueFees />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
