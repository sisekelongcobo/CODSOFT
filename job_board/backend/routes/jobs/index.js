import express from "express";
import applicantsRouter from "./EmployerApplicants.js";
import jobsRouter from "./Jobs.js";

const router = express.Router();

router.use("/", applicantsRouter);
router.use("/", jobsRouter);

export default router;
