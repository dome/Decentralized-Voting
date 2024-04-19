import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    const filePath = path.join(process.cwd(), "candidateaddress.json");

    try {
      // Truncate the file, which effectively deletes all content
      fs.truncateSync(filePath);
      res.status(200).json({ message: "All content deleted successfully" });
    } catch (error) {
      // Handle file truncation error
      console.error("Error truncating file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
