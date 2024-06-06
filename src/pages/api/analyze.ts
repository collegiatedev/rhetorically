// pages/api/analyze.ts
import { analyzeLatestProfile } from "../../server/api/analyzeData";

export default async function handler(req, res) {
  try {
    const result = await analyzeLatestProfile();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
