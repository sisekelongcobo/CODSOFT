import express from "express";
import getApplicantInformationRouter from "./ApplicantInformation.js";
import getApplicantsRouter from "./Applicants.js";
import uploadResumeRouter from "./uploadResume.js";
const router = express.Router();

router.use("/", getApplicantsRouter);
router.use("/", getApplicantInformationRouter);
router.use("/", uploadResumeRouter);

export default router;
