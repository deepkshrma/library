import express from "express";
import Student from "../models/Student.js";
import mongoose from "mongoose";

const router = express.Router();

// Create a new student
router.post("/", async (req, res) => {
  try {
    const exists = await Student.findOne({ seatNo: req.body.seatNo, status: { $in: ['paid', 'due'] } });
    if (exists) {
      return res.status(400).json({ error: "Seat already in use by an active member." });
    }

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
// routes/studentRoutes.js

router.patch("/:id", async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "fatherName",
      "mobile",
      "parentMobile",
      "address",
      "seatNo",
      "aadharNo",
      "profileImage",
      "monthlyFee",
      "joinDate",
      "endMonth",
      "fees" // Only update if you're sending fees data intentionally
    ];

    const updateData = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
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
  const { method } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const join = new Date(student.joinDate);
    const today = new Date();

    // Determine how many full billing cycles (months) have passed since join date
    let monthsPassed =
      (today.getFullYear() - join.getFullYear()) * 12 +
      (today.getMonth() - join.getMonth());

    // If today is before the original day-of-month, subtract 1 month
    if (today.getDate() < join.getDate()) {
      monthsPassed -= 1;
    }

    // Calculate the next due date from join date, NOT from today
    const nextDue = new Date(join);
    nextDue.setMonth(join.getMonth() + monthsPassed + 1);
    nextDue.setDate(join.getDate());

    // Update fields
    student.status = "Paid";
    student.nextDueDate = nextDue;
    student.paymentMethod = method || "cash";

    await student.save();
    res.json({ message: "Payment successful", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// routes/studentRoutes.js
router.put("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(" Invalid ObjectId", id);
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        status: "Old",
        $unset: { seatNo: "" },
      },
      { new: true }
    );


    if (!updated) {
      console.log("Student not found with ID:", id);
      return res.status(404).json({ error: "Student not found" });
    }

    console.log(" Student removed:", updated);
    res.json(updated);
  } catch (err) {
    console.error(" Error in /remove/:id →", err);
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
