import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import applications from "./applications.js";
import jobsRouter from "./Jobs.js";

const router = express.Router();

router.use("/", ClerkExpressRequireAuth(), applications);
router.use("/", jobsRouter);

export default router;
