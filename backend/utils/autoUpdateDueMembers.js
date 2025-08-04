import Student from "../models/Student.js";

const autoUpdateDueMembers = async () => {
  try {
    const students = await Student.find({ status: "Paid" });
    const today = new Date();

    for (let student of students) {
      const joinDate = new Date(student.joinDate);

      // Calculate the next due date (1 month after join date, then repeating monthly)
      const expectedNextDue = new Date(joinDate);
      expectedNextDue.setMonth(expectedNextDue.getMonth() + 1);

      // While loop to keep moving expectedDue into the future
      while (today >= expectedNextDue) {
        expectedNextDue.setMonth(expectedNextDue.getMonth() + 1);
      }

      // If today is after last valid paid month, mark as Due
      const lastPaidMonth = new Date(expectedNextDue);
      lastPaidMonth.setMonth(lastPaidMonth.getMonth() - 1);

      if (today >= new Date(lastPaidMonth.setDate(joinDate.getDate()))) {
        student.status = "Due";
        await student.save();
      }
    }

    console.log("✅ Auto status update complete.");
  } catch (err) {
    console.error("❌ Error in autoUpdateDueMembers:", err);
  }
};


export default autoUpdateDueMembers;
