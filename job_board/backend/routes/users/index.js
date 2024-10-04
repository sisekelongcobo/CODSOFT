import express from "express";
import applications from "./applications.js";
import getUserData from "./UserData.js";

const router = express.Router();

router.use("/", applications);
router.use("/", getUserData);

export default router;
