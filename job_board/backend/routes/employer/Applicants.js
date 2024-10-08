import express from "express";

const router = express.Router();

router.get("/pending-applicants", async (req, res, next) => {
  try {
    const { userId } = req.query;

    // SQL query to fetch pending applications with applicant's full name
    const query = `
      SELECT ua.applicationId, ua.jobId, ua.userId AS applicantId, pi.fullName AS applicantName, 
             ua.status, ua.appliedDate, j.title AS jobTitle, j.company, j.location, 
             j.jobType, j.workMode
      FROM user_applications ua
      JOIN jobs j ON ua.jobId = j.jobId
      JOIN personal_information pi ON ua.userId = pi.userId
      WHERE ua.status = 'Pending' 
        AND j.userId = ?
    `;

    req.db.query(query, [userId], (err, result) => {
      if (err) return next(err);
      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

router.get("/approved-applicants", async (req, res, next) => {
  try {
    const { userId } = req.query;

    // SQL query to fetch pending applications with applicant's full name
    const query = `
      SELECT ua.applicationId, ua.jobId, ua.userId AS applicantId, pi.fullName AS applicantName, 
             ua.status, ua.appliedDate, j.title AS jobTitle, j.company, j.location, pi.emailAddress AS applicantEmail,
             j.jobType, j.workMode
      FROM user_applications ua
      JOIN jobs j ON ua.jobId = j.jobId
      JOIN personal_information pi ON ua.userId = pi.userId
      WHERE ua.status = 'Accepted' 
        AND j.userId = ?
    `;

    req.db.query(query, [userId], (err, result) => {
      if (err) return next(err);
      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

router.post("/applicants/:userId/:jobId", async (req, res, next) => {
  try {
    const { userId, jobId } = req.params;

    const alreadyAppliedQuery = `
      SELECT 
          * 
      FROM 
          user_applications
      WHERE 
          userId = ?
      AND 
          jobId = ?`;

    req.db.query(alreadyAppliedQuery, [userId, jobId], (err, result) => {
      if (err) return next(err);

      if (result.length !== 0) {
        return res.status(400).json({ message: "User has already applied for this job." });
      } else {
        const query = `
          INSERT INTO 
              user_applications (userId, jobId, status, appliedDate)
          VALUES 
              (?, ?, ?, NOW())`;

        req.db.query(query, [userId, jobId, "pending"], (err, result) => {
          if (err) return next(err);

          res.json({ message: "Applicant added successfully." });
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

router.put("/applicants/confirm:userId/:jobId", async (req, res, next) => {
  try {
    const { userId, jobId } = req.params;

    const query = `
      UPDATE 
          user_applications
      SET 
          status = 'Accepted'
      WHERE 
          userId = ?
      AND 
          jobId = ?`;

    req.db.query(query, [userId, jobId], (err, result) => {
      if (err) return next(err);

      res.json({ message: "Applicant accepted successfully." });
    });
  } catch (err) {
    next(err);
  }
});

router.put("/applicants/reject/:userId/:jobId", async (req, res, next) => {
  try {
    const { userId, jobId } = req.params;

    const query = `
      UPDATE 
          user_applications
      SET 
          status = 'Rejected'
      WHERE 
          userId = ?
      AND 
          jobId = ?`;

    req.db.query(query, [userId, jobId], (err, result) => {
      if (err) return next(err);

      res.json({ message: "Applicant removed successfully." });
    });
  } catch (err) {
    next(err);
  }
});
export default router;
