import { clerkClient } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

router.get("/user-data", async (req, res, next) => {
  try {
    const { userId } = req.auth;

    const user = await clerkClient.users.getUser(userId);
    const fullName = user.fullName || user.firstName || "Unknown";
    const imageUrl = user.imageUrl;
    const emailAddress = user.emailAddresses[0].emailAddress;

    req.db.query("SELECT * FROM users WHERE userId = ?", [userId], (err, result) => {
      if (err) return next(err);

      if (result.length === 0) {
        const role = "user";

        req.db.query(
          "INSERT INTO users SET ?",
          { userId, role, fullName, imageUrl, emailAddress },
          (err, insertResult) => {
            if (err) return next(err);
            res.json({ id: userId, role, fullName, imageUrl, emailAddress });
          },
        );
      } else {
        const existingUser = result[0];

        res.json({
          userId: existingUser.userId,
          role: existingUser.role,
          fullName: existingUser.fullName,
          imageUrl: existingUser.imageUrl,
          emailAddress: existingUser.emailAddress,
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
