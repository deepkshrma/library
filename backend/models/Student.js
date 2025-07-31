import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  month: {
    type: String, // Format: "YYYY-MM"
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paidDate: {
    type: Date,
    default: null
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "online", "other"],
    default: "cash"
  }
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fatherName: String,
  mobile: String,               // Student's mobile number
  parentMobile: String,         // ✅ Parent's number (optional)
  address: String,
  seatNo: {
    type: String,
    required: true,
    unique: true                // ✅ Unique seat number
  },
  aadharNo: String,
  profileImage: {
    type: String,
    default: ""                 // URL or path to image
  },
  monthlyFee: {
    type: Number,
    default: 500,  // You can change default
    required: true
  },

  joinDate: {
    type: Date,
    required: true
  },
  endMonth: String,
  status: {
    type: String,
    enum: ["paid", "due", "old"],
    default: "paid"
  },
  fees: [feeSchema]
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
