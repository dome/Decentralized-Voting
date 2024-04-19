// pages/api/getCandidates.js

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "candidateaddress.json");
    const candidateData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json(candidateData);
  } catch (error) {
    console.error("Error fetching candidate data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
