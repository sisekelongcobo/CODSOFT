import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const router = express.Router();

router.get("/all-jobs", async (req, res, next) => {
  try {
    req.db.query("SELECT * FROM jobs", (err, result) => {
      if (err) return next(err);

      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

router.get("/new-jobs", async (req, res, next) => {
  try {
    req.db.query(
      "SELECT * FROM jobs WHERE createdAt > DATE_SUB(NOW(), INTERVAL 5 DAY)",
      (err, result) => {
        if (err) return next(err);

        res.json(result);
      },
    );
  } catch (err) {
    next(err);
  }
});

router.post("/add-job", ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      postedDate,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      responsibilities,
      requirements,
    } = req.body;

    // Ensure all required fields are provided
    if (!title || !company || !location || !postedDate || !jobType || !workMode) {
      return res.status(400).json({ error: "All required fields must be filled out." });
    }

    const query = `
      INSERT INTO jobs (
        title, company, location, postedDate, jobType, workMode, 
        companyDescription, roleDescription, jobDescription, responsibilities, requirements
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      title,
      company,
      location,
      postedDate,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      JSON.stringify(responsibilities), // Convert JSON object to string
      JSON.stringify(requirements), // Convert JSON object to string
    ];

    req.db.query(query, values, (err, result) => {
      if (err) return next(err);

      res.status(201).json({ message: "Job added successfully", jobId: result.insertId });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
