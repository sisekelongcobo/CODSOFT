import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "../../.env.local" }); 

// Create a transporter
export const sendTestEmail = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL_ADDRESS, 
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: "sisekelongcobo12@gmail.com",
    subject: "Test Email",
    text: "Hello, this is a test email!",
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
