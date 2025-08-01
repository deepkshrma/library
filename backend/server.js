import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import autoUpdateDueMembers from "./utils/autoUpdateDueMembers.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await autoUpdateDueMembers();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.error("MongoDB Error:", err);
  });
