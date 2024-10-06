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
  const { email, fullName } = req.body;

  try {
    notifyUserAccountUpdate(email, fullName);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
});

router.post("/schedule-interview", async (req, res) => {
  const { userEmail, userFullName, jobTitle, interviewDate, interviewTime, employerName } =
    req.body;

  try {
    notifyUserInterviewScheduled(
      userEmail,
      userFullName,
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
  const { employerEmail, applicantFullName, jobTitle } = req.body;

  try {
    notifyEmployerNewApplicant(employerEmail, applicantFullName, jobTitle);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
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

router.post("/job-post-updated", async (req, res) => {
  const { employerEmail, jobTitle } = req.body;

  try {
    notifyEmployerJobPostUpdated(employerEmail, jobTitle);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
});

router.post("/application-accepted", async (req, res) => {
  const { userEmail, userFullName, jobTitle } = req.body;

  try {
    notifyUserApplicationAccepted(userEmail, userFullName, jobTitle);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email" });
  }
});

export default router;
