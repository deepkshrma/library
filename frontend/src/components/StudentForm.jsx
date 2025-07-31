import { useState } from "react";
import { addStudent } from "../api/studentApi";

const initialState = {
  name: "",
  fatherName: "",
  mobile: "",
  address: "",
  seatNo: "",
  joinDate: "",
  endMonth: "",
};

export default function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(form);
      onStudentAdded(); // refresh list
      setForm(initialState); // reset form
    } catch (err) {
      console.error("Add Error:", err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="fatherName"
          placeholder="Father Name"
          value={form.fatherName}
          onChange={handleChange}
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          name="seatNo"
          placeholder="Seat No."
          value={form.seatNo}
          onChange={handleChange}
        />
        <input
          name="joinDate"
          type="date"
          value={form.joinDate}
          onChange={handleChange}
        />
        <input
          name="endMonth"
          placeholder="End Month"
          value={form.endMonth}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
