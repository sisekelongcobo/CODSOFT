import express from "express";
import jobsRouter from "./jobs/index.js";
import userRouter from "./users/index.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/jobs", jobsRouter);

export default router;