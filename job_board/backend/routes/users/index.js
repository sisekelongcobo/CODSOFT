import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import applications from "./applications.js";
import getUserData from "./getUserData.js";

const router = express.Router();

router.use(ClerkExpressRequireAuth);

router.use("/",applications);
router.use("/",getUserData);

export default router;
