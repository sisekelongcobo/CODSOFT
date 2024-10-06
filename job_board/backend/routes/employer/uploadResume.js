import { put } from "@vercel/blob";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
dotenv.config({ path: "../../.env.local" });

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const blob = await put(file.originalname, file.buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.json({ url: blob.url });
    // res.json({ blob: blob, });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "File upload failed", error: err.message });
  }
});

export default router;
