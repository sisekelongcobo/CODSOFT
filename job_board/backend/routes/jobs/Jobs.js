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

router.get("/my-jobs/",ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    const user = req.auth;
    const userId = user?.userId;

    req.db.query("SELECT * FROM jobs WHERE userId = ?", [userId], (err, result) => {
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
      "SELECT * FROM jobs WHERE createdAt > DATE_SUB(NOW(), INTERVAL 10 DAY)",
      (err, result) => {
        if (err) return next(err);

        res.json(result);
      },
    );
  } catch (err) {
    next(err);
  }
});

router.post("/create-job",ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    const user = req.auth;
    const userId = user?.userId;

    const {
      title,
      company,
      location,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      responsibilities = [], // Default to empty array if not provided
      requirements = [], // Default to empty array if not provided
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !workMode ||
      !companyDescription ||
      !roleDescription ||
      !jobDescription 
    ) {
      return res.status(400).json({ error: "All required fields must be filled out." });
    }

    // SQL query to insert job data
    const query = `
      INSERT INTO jobs (
        title, company, location, createdAt, jobType, workMode, 
        companyDescription, roleDescription, jobDescription, responsibilities, requirements, userId
      ) VALUES (?, ?, ?, Now(), ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Prepare the values for the SQL query
    const values = [
      title,
      company,
      location,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      JSON.stringify(responsibilities), // Convert array/object to string
      JSON.stringify(requirements), // Convert array/object to string
      userId,
    ];

    // Execute the SQL query
    req.db.query(query, values, (err, result) => {
      if (err) {
        // Log error and send response
        console.error("Error inserting job:", err);
        return next(err);
      }

      // Successfully inserted the job, return the job ID
      res.status(201).json({ message: "Job added successfully", jobId: result.insertId });
    });
  } catch (err) {
    // Handle any unexpected errors
    console.error("Unexpected error:", err);
    next(err);
  }
});

router.delete("/delete-job/:jobId", ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    const { jobId } = req.params;

    req.db.query("DELETE FROM jobs WHERE jobId = ?", [jobId], (err) => {
      if (err) return next(err);

      res.json({ message: "Job deleted successfully" });
    });
  } catch (err) {
    next(err);
  }
});

router.put("/update-job/:jobId", async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const {
      title,
      company,
      location,
      createdAt,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      responsibilities,
      requirements,
    } = req.body;

    // Ensure all required fields are provided
    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !workMode ||
      !companyDescription ||
      !roleDescription ||
      !jobDescription ||
      !responsibilities ||
      !requirements
    ) {
      return res.status(400).json({ error: "All required fields must be filled out." });
    }

    const query = `
      UPDATE jobs SET
        title = ?,
        company = ?,
        location = ?,
        createdAt = ?,
        jobType = ?,
        workMode = ?,
        companyDescription = ?,
        roleDescription = ?,
        jobDescription = ?,
        responsibilities = ?,
        requirements = ?
      WHERE jobId = ?`;

    const values = [
      title,
      company,
      location,
      createdAt,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      JSON.stringify(responsibilities), // Convert JSON object to string
      JSON.stringify(requirements), // Convert JSON object to string
      jobId,
    ];

    // Use promise-based query
    await req.db.query(query, values);

    res.json({ message: "Job updated successfully" });
  } catch (err) {
    console.error("Error updating job:", err);
    next(err);
  }
});
export default router;
