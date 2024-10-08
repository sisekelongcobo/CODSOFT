import { clerkClient, ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

router.post("/user-data", ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    let { userId } = req.auth;
    if (!userId) {
      userId = req.auth.sessionClaims.sub;
      return res.status(401).json({ error: "Unauthorized, no userId found" });
    }

    const user = await clerkClient.users.getUser(userId);
    const fullName = user.fullName || user.firstName || "Unknown";
    const imageUrl = user.imageUrl;
    const emailAddress = user.emailAddresses[0].emailAddress;

    req.db.query("SELECT * FROM users WHERE userId = ?", [userId], async (err, result) => {
      if (err) {
        console.error("Error querying users table:", err);
        return next(err);
      }

      const role = "user";

      if (result.length === 0) {
        // Insert into users table if user doesn't exist
        await new Promise((resolve, reject) => {
          req.db.query(
            "INSERT INTO users SET ?",
            { userId, role, fullName, imageUrl, emailAddress },
            (err, insertResult) => {
              if (err) {
                console.error("Error inserting into users table:", err);
                return reject(err);
              }
              resolve(insertResult);
            },
          );
        });
      }

      // Function to insert or update a specific table
      const upsert = (tableName, data) => {
        return new Promise((resolve, reject) => {
          req.db.query(`SELECT * FROM ${tableName} WHERE userId = ?`, [userId], (err, result) => {
            if (err) {
              console.error(`Error querying table ${tableName}:`, err);
              return reject(err);
            }

            if (result.length === 0) {
              // If userId doesn't exist, insert a new record
              req.db.query(
                `INSERT INTO ${tableName} SET ?`,
                { userId, ...data },
                (err, insertResult) => {
                  if (err) {
                    console.error(`Error inserting into table ${tableName}:`, err);
                    return reject(err);
                  }
                  resolve(insertResult);
                },
              );
            } else {
              resolve(); // No need to update
            }
          });
        });
      };

      // Data to upsert for each table (update only fields without default values)
      const personalInfoData = {
        fullName: fullName,
        phoneNumber: "1234567890",
        emailAddress: emailAddress,
        city: "City",
        resume: "resume",
        linkedInProfileLink: "linkedInProfileLink",
        githubProfileLink: "githubProfileLink",
      };

      const portfolioData = {
        projectTitle: "projectTitle",
        projectLink: "projectLink",
        projectDescription: "projectDescription",
      };

      const skillsData = {
        skills: JSON.stringify(["skill1"]),
      };

      const workExperienceData = {
        jobTitle: "jobTitle",
        company: "company",
        startDate: "2022-01-01",
        endDate: "2022-01-01",
        responsibilities: "responsibilities",
      };

      const educationData = {
        degree: "degree",
        institution: "institution",
        completionDate: "2022-01-01",
      };

      // Perform upserts
      await Promise.all([
        upsert("personal_information", personalInfoData),
        upsert("portfolio", portfolioData),
        upsert("skills", skillsData),
        upsert("work_experience", workExperienceData),
        upsert("education", educationData),
      ]);

      // Fetch and return user data
      const existingUser = result[0] || { userId, role, fullName, imageUrl, emailAddress };

      res.json({
        userId: existingUser.userId,
        role: existingUser.role,
        fullName: existingUser.fullName,
        imageUrl: existingUser.imageUrl,
        emailAddress: existingUser.emailAddress,
      });
    });
  } catch (err) {
    console.error("Error in /user-data route:", err);
    next(err);
  }
});

export default router;
