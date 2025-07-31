import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Create a new student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student data (including profile image)
router.patch("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Make sure profileImage is sent in req.body if you're updating it
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Mark specific month’s fee as paid
router.patch("/:id/pay-fee", async (req, res) => {
  const { month, method } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const fee = student.fees.find(f => f.month === month);
    if (!fee) return res.status(400).json({ error: "Month not found in fees" });

    fee.paid = true;
    fee.paidDate = new Date();
    fee.paymentMethod = method || "cash";

    // Optionally update status to 'active'
    student.status = "active";

    await student.save();
    res.json({ message: "Fee marked as paid", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes/studentRoutes.js
router.patch("/:id/remove", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.status = "old";
    student.seatNo = null;
    await student.save();

    res.json({ message: "Student marked as old", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/students/:id/update-seat
router.patch("/:id/update-seat", async (req, res) => {
  const { seatNo } = req.body;

  if (!seatNo) return res.status(400).json({ error: "Seat number is required" });

  try {
    // Check if seat number already assigned to another student
    const existing = await Student.findOne({ seatNo });
    if (existing && existing._id.toString() !== req.params.id) {
      return res.status(409).json({ error: "Seat number already in use" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.seatNo = seatNo;
    await student.save();

    res.json({ message: "Seat number updated", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
