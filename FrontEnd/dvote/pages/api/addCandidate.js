// pages/api/addCandidate.js

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const filePath = path.join(process.cwd(), "candidateaddress.json");

    // Read existing data from address.json (if any)
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      // Handle file read error
      console.error("Error reading address.json:", error);
    }

    // Append the new candidate details to the existing data
    existingData.push(data);

    // Write the updated data back to address.json
    fs.writeFileSync(filePath, JSON.stringify(existingData));

    res.status(200).json({ message: "Candidate added successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
