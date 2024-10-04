import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const router = express.Router();

router.get("/applicants", ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    const query = `
      SELECT 
          u.userId,
          u.fullName,
          ua.status,
          ua.appliedDate,
          j.title AS jobTitle
      FROM 
          user_applications ua
      JOIN 
          users u ON ua.userId = u.userId
      JOIN 
          jobs j ON ua.jobId = j.jobId
      WHERE 
          u.userId = ?
      AND 
          ua.status = 'pending'`;

    req.db.query(query, [userId], (err, result) => {
      if (err) return next(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "No applicants found for this job." });
      }

      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
