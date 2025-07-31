import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  month: {
    type: String, 
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
  mobile: String,              
  parentMobile: String,         
  address: String,
  seatNo: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  aadharNo: String,
  profileImage: {
    type: String,
    default: ""               
  },
  monthlyFee: {
    type: Number,
    default: 500, 
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
