import axios from "axios";

const API_BASE = "http://localhost:5000/api/students";

// Get all students
export const getStudents = () => axios.get(API_BASE);

// Add a student
export const addStudent = (data) => axios.post(API_BASE, data);

// Delete a student
export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);

// Update a student
export const updateStudent = (id, data) => axios.patch(`${API_BASE}/${id}`, data);
