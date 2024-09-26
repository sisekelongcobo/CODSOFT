import cors from "cors";
import express from "express";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import userRouter from "./routes/users/getUserData.js";
import { checkDbConnection, dbConnection, initializeDbConnection } from "./databaseConnection.js";
import userJobsRouter from "./routes/jobs/Jobs.js";
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (!(await checkDbConnection())) initializeDbConnection();
  if (dbConnection) req.db = dbConnection;
  else return next(new Error("Database error"));
  next();
});

app.use("/protected", (req, res) => {
  res.json({ message: "You are authenticated!" });
});

app.use("/users", cors(corsOptions), userRouter);
app.use("/jobs", userJobsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.get("/test", (req, res) => {
  req.db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.use((err, req, res, next) => {
  if (err.message === "Unauthenticated") {
    res.status(401).json({ error: "You are unauthenticated" });
  } else if (err.message === "Database error") {
    res.status(500).json({ error: "Database error" });
  } else if (err.message === "Missing required parameters") {
    res.status(400).json({ error: "Missing required parameters" });
  } else {
    console.error("Error:", err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
