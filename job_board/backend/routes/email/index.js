import express from "express";
import emailsRouter from "./sendEmailService.js";

const router = express.Router();

router.use("/", emailsRouter);

export default router;
