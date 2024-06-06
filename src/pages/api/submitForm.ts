// pages/api/submitForm.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { gpa, major } = req.body; // Capture the form data sent from the frontend
  try {
    const result = await prisma.studentProfile.create({
      data: {
        gpa: parseFloat(gpa), // Ensure gpa is stored as a float
        intendedMajor: major,
        // Initialize other fields as default or null if necessary
        academicProgram: "",
        curriculumRanking: 0,
        studyAbroadRanking: 0,
        graduateSchoolRanking: 0,
        academicSupportRanking: 0,
        userId: "your-user-id-here", // Modify according to how you handle user authentication
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Failed to submit form:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
