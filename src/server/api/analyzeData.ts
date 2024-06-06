import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const openAiApiKey = process.env.OPENAI_API_KEY;
const openAiApiUrl = "https://api.openai.com/v1/engines/davinci/completions";

async function getMostRecentStudentProfile() {
  return await prisma.studentProfile.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
}

const getAnalysisFromOpenAI = async (text) => {
  try {
    const response = await axios.post(
      openAiApiUrl,
      {
        prompt: text,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resultText = response.data.choices[0].text;
    console.log("OpenAI API result:", resultText);
    return resultText;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
};

async function analyzeLatestProfile() {
  const profile = await getMostRecentStudentProfile();
  if (profile) {
    const textPrompt = `Generate a summary for a student profile with the following details: GPA - ${profile.gpa}, Major - ${profile.intendedMajor}.`;
    return await getAnalysisFromOpenAI(textPrompt);
  } else {
    console.log("No profiles found in the database.");
    return null;
  }
}

export {
  getMostRecentStudentProfile,
  getAnalysisFromOpenAI,
  analyzeLatestProfile,
};

// Call this function where needed in your application
// analyzeLatestProfile().then((result) => console.log(result));
