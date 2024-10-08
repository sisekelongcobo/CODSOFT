import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const router = express.Router();

router.get("/applications", async (req, res, next) => {
  try {
    const { userId } = req.query;

    const query = `
      SELECT 
        ua.*,
        j.title,
        j.company
      FROM 
        user_applications ua
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
