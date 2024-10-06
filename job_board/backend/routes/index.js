import express from "express";
import emailRouter from "./email/index.js";
import employerRouter from "./employer/index.js";
import jobsRouter from "./jobs/index.js";
import userRouter from "./users/index.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/jobs", jobsRouter);
router.use("/employer", employerRouter);
router.use("/email", emailRouter);

export default router;
