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

router.post("/add-job", async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      responsibilities,
      requirements,
      userId,
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
      !requirements ||
      !userId
    ) {
      return res.status(400).json({ error: "All required fields must be filled out." });
    }

    const query = `
      INSERT INTO jobs (
        title, company, location, createdAt, jobType, workMode, 
        companyDescription, roleDescription, jobDescription, responsibilities, requirements, userId
      ) VALUES (?, ?, ?,Now(), ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      title,
      company,
      location,
      jobType,
      workMode,
      companyDescription,
      roleDescription,
      jobDescription,
      JSON.stringify(responsibilities), // Convert JSON object to string
      JSON.stringify(requirements), // Convert JSON object to string
      userId,
    ];

    req.db.query(query, values, (err, result) => {
      if (err) return next(err);

      res.status(201).json({ message: "Job added successfully", jobId: result.insertId });
    });
  } catch (err) {
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
