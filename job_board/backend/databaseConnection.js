import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbConfig = process.env.DATABASE_URL || {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

export let dbConnection;

export const initializeDbConnection = () => {
  if (!dbConnection) {
    dbConnection = mysql2.createConnection(dbConfig);
    dbConnection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database:", err);
        dbConnection = null;
      } else {
        console.log("Connected to MySQL database");
      }
    });
  }
};

export const checkDbConnection = () =>
  new Promise((resolve) => {
    if (!dbConnection) return resolve(false);
    dbConnection.ping((err) => {
      if (err) {
        console.error("MySQL connection lost:", err);
        dbConnection = null;
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
