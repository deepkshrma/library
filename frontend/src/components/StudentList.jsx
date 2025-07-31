import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../api/studentApi";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchData();
  };

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} - {s.mobile}
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
