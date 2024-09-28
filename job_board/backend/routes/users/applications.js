import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const router = express.Router();
router.use(ClerkExpressRequireAuth());

// Route to get all applications for a user and join with jobs table to get job title and company
router.get("/applications", async (req, res, next) => {
  try {
    const { userId } = req.auth;

    const query = `
      SELECT 
        ua.*,
        j.title,
        j.company
      FROM 
        userApplications ua
      JOIN 
        jobs j
      ON 
        ua.jobId = j.jobId
      WHERE 
        ua.userId = ?
      ORDER BY 
        ua.appliedDate DESC
    `;

    req.db.query(query, [userId], (err, result) => {
      if (err) return next(err);

      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
