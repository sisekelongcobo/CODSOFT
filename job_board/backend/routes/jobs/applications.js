import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";

const router = express.Router();
router.use(ClerkExpressRequireAuth());

router.get("/applications", async (req, res, next) => {
  try {
    const { userId } = req.auth;
    console.log(userId);

    const query = `
        SELECT 
            ua.*,
            pi.fullName, pi.phoneNumber, pi.emailAddress, pi.city, pi.resume, pi.linkedInProfileLink, pi.githubProfileLink,
            we.jobTitle AS workExperienceJobTitle, we.company, we.startDate AS workStartDate, we.endDate AS workEndDate, we.responsibilities,
            ed.degree, ed.institution, ed.completionDate,
            pf.projectTitle, pf.projectLink, pf.projectDescription,
            jp.desiredJobTitle, jp.preferredLocation, jp.salaryExpectations, jp.availability,
            sk.skills
        FROM 
            userapplications ua
        LEFT JOIN 
            personalInformation pi ON ua.userId = pi.userId
        LEFT JOIN 
            workExperience we ON ua.userId = we.userId
        LEFT JOIN 
            education ed ON ua.userId = ed.userId
        LEFT JOIN 
            portfolio pf ON ua.userId = pf.userId
        LEFT JOIN 
            jobPreferences jp ON ua.userId = jp.userId
        LEFT JOIN 
            skills sk ON ua.userId = sk.userId
        WHERE 
            ua.userId = ?;
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
