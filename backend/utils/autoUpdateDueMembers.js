import Student from "../models/Student.js";

const autoUpdateDueMembers = async () => {
  try {
    const students = await Student.find({ status: "Paid" });
    const today = new Date();

    for (let student of students) {
      const oneMonthLater = new Date(student.joinDate);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      if (today > oneMonthLater) {
        student.status = "Due";
        await student.save();
      }
    }

    console.log("✔ Auto status update complete.");
  } catch (err) {
    console.error("❌ Error in autoUpdateDueMembers:", err);
  }
};

export default autoUpdateDueMembers;
