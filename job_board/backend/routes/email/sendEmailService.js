import express from "express";
import {
  notifyEmployerJobPostUpdated,
  notifyEmployerNewApplicant,
  notifyUserAccountUpdate,
  notifyUserApplicationAccepted,
  notifyUserApplicationSent,
  notifyUserInterviewScheduled,
} from "./emailService.js";

const router = express.Router();

router.post("/account-update", async (req, res) => {
  const { applicantEmail, applicantName } = req.body;

  console.log(req.body);

  try {
    notifyUserAccountUpdate(applicantEmail, applicantName);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
});

router.post("/schedule-interview", async (req, res) => {
  const { applicantEmail, applicantName, jobTitle, interviewDate, interviewTime, employerName } =
    req.body;
  console.log(req.body);

  try {
    notifyUserInterviewScheduled(
      applicantEmail,
      applicantName,
      jobTitle,
      interviewDate,
      interviewTime,
      employerName,
    );
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
});

router.post("/new-applicant", async (req, res) => {
  const { applicantFullName, jobId } = req.body;
  let employerEmail = "";
  let jobTitle = "";
  let userId = "";

  const getJobTitleQuery = `SELECT title AS jobTitle, userId FROM jobs WHERE jobId = ?`;

  req.db.query(getJobTitleQuery, [jobId], async (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Error fetching job title" });
    }

    jobTitle = result[0].jobTitle;
    userId = result[0].userId;

    const getEmployerEmailQuery = `SELECT emailAddress AS employerEmail FROM personal_information WHERE userId = ?`;

    req.db.query(getEmployerEmailQuery, [userId], async (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error fetching employer email" });
      }
      if (result.length === 0) {
        return;
      }
      employerEmail = result[0].employerEmail;
      console.log(employerEmail);

      try {
        notifyEmployerNewApplicant(employerEmail, applicantFullName, jobTitle);
        res.status(200).send({ message: "Email sent" });
      } catch (err) {
        res.status(500).send({ message: "Error sending email" });
      }
    });
  });
});

router.post("/application-sent", async (req, res) => {
  const { userEmail, userFullName } = req.body;

  try {
    notifyUserApplicationSent(userEmail, userFullName);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
});

router.post("/job-post-updated", async (req, res, next) => {
  const { userId, jobTitle } = req.body;

  let employerEmail = "";
  let employerName = "";
  const query = `
    SELECT emailAddress AS employerEmail, fullName as employerName FROM personal_information WHERE userId = ?`;

  // Execute the query and handle the result
  req.db.query(query, [userId], async (err, result) => {
    if (err) {
      return next(err); // Forward the error to the error-handling middleware
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Employer email not found" });
    }
    employerEmail = result[0].employerEmail;
    employerName = result[0].employerName;

    try {
      // Send email notification after ensuring the query returned the correct result
      await notifyEmployerJobPostUpdated(employerEmail, employerName, jobTitle);
      res.status(200).send({ message: "Email sent" });
    } catch (err) {
      res.status(500).send({ message: "Error sending email" });
    }
  });
});

router.post("/application-accepted", async (req, res) => {
  const { userEmail, userFullName, jobId } = req.body;
  let jobTitle = "";

  const getJobTitleQuery = `SELECT title AS jobTitle FROM jobs WHERE jobId = ?`;

  req.db.query(getJobTitleQuery, [jobId], async (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Error fetching job title" });
    }

    jobTitle = result[0].jobTitle;

    try {
      notifyUserApplicationAccepted(userEmail, userFullName, jobTitle);
      res.status(200).send({ message: "Email sent" });
    } catch (err) {
      res.status(500).send({ message: "Error sending email" });
    }
  });
});

export default router;
