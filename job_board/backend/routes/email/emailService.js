import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "../../.env.local" });

// Create a transporter
export const sendEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL_ADDRESS,
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  });

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const createApplicationSentTemplate = (fullName) => `
  <p>Dear ${fullName},</p>
  <br>
  <p>Thank you for your application! We have received your application and will review it shortly. Please wait for a response from the employer.</p>
  <br>
  <p>Best regards,<br>Job Board Team</p>
`;

const createNewApplicantTemplate = (fullName, jobTitle) => `
  <p>Dear Employer,</p>
  <br>
  <p>We are excited to inform you that a new applicant has applied for the position of ${jobTitle}.</p>
  <p>Applicant Name: ${fullName}</p>
  <p>Please log in to your dashboard to review the application.</p>
  <br>
  <p>Best regards,<br>Job Board Team</p>
`;

const createAccountUpdateTemplate = (fullName) => `
  <p>Dear ${fullName},</p>
  <br>
  <p>We wanted to inform you that your account information has been successfully updated. This change ensures that your profile remains current and accurate, allowing you to enjoy all the features and benefits of our platform without any issues.</p>
  <p>If you did not authorize this update or if you notice any incorrect information, please contact our support team immediately so that we can assist you in securing your account.</p>
  <p>Your security and privacy are important to us, and we are here to help with any concerns you may have.</p>
  <br>
  <p>Thank you for being a valued member of our platform.<br>Best regards,<br>Job Board Team</p>
`;

const createApplicationAcceptedTemplate = (fullName, jobTitle) => `
  <p>Dear ${fullName},</p>
  
  <p>Congratulations! We are thrilled to inform you that your application for the position of <strong>${jobTitle}</strong> has been accepted by the employer. This is an important step toward starting your new role, and we know it’s a great opportunity for you.</p>
  <p>The employer will likely contact you soon with further instructions regarding the next steps in the hiring process. In the meantime, we encourage you to log in to your account and review any updates or requests from the employer.</p>
  <p>If you have any questions or need assistance, don't hesitate to reach out. We wish you the best of luck as you move forward with this exciting opportunity!</p>
  <br>
  Kind regards,
  <br>
  Job Board Team
`;

const createJobPostUpdateTemplate = (employerName, jobTitle) => `
  <p>Dear ${employerName},</p>
  <br>
  <p>We are writing to confirm that the job post for the position of <strong>${jobTitle}</strong> has been successfully updated. The changes you made have been applied and are now visible to potential candidates on our platform.</p>
  <p>If you did not initiate these updates or if any of the details in the job post seem incorrect, please contact our support team as soon as possible. Ensuring the accuracy of your job listings helps attract the right candidates, and we are here to help ensure everything is set up correctly.</p>
  <p>We appreciate your continued use of our platform, and we’re excited to support you in finding the best talent for your team!</p>
  <br>
  <p>Sincerely,<br>Job Board Team</p>
`;

const createInterviewScheduledTemplate = (
  fullName,
  jobTitle,
  interviewDate,
  interviewTime,
  employerName,
) => `
  <p>Dear ${fullName},</p>
  <br>
  <p>We are pleased to inform you that your application for the position of <strong>${jobTitle}</strong> has progressed, and an interview has been scheduled.</p>
  <p><strong>Interview Details:</strong></p>
  <ul>
    <li><strong>Date:</strong> ${interviewDate}</li>
    <li><strong>Time:</strong> ${interviewTime}</li>
    <li><strong>Employer:</strong> ${employerName}</li>
  </ul>
  <p>Please make sure you are available at the specified time. If you need to reschedule, contact the employer as soon as possible.</p>
  <br>
  <p>Best of luck! We look forward to your interview success.</p>
  <p>Best regards,<br>Job Board Team</p>
`;

const createApplicationRejectedTemplate = (fullName, jobTitle) => `
  <p>Dear ${fullName},</p>
  <br>
  <p>Thank you for applying for the position of <strong>${jobTitle}</strong>. After careful consideration, we regret to inform you that your application was not successful at this time.</p>
  <p>We encourage you to continue applying for other positions that may align with your skills and experience. We greatly appreciate your interest in the role and in our company, and we hope to have the opportunity to consider your application again in the future.</p>
  <br>
  <p>Best regards,<br>Job Board Team</p>
`;

export const notifyUserAccountUpdate = (userEmail, userFullName) => {
  const subject = "Account Information Updated";
  const htmlContent = createAccountUpdateTemplate(userFullName);
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: userEmail,
    subject: subject,
    html: htmlContent,
  };

  sendEmail(mailOptions);
};

export const notifyUserApplicationAccepted = (userEmail, userFullName, jobTitle) => {
  const subject = "Application Accepted";
  const htmlContent = createApplicationAcceptedTemplate(userFullName, jobTitle);
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: userEmail,
    subject: subject,
    html: htmlContent,
  };

  sendEmail(mailOptions);
};

export const notifyEmployerJobPostUpdated = (employerEmail, employerName, jobTitle) => {
  const subject = "Job Post Updated";
  const htmlContent = createJobPostUpdateTemplate(employerName, jobTitle);
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: employerEmail,
    subject: subject,
    html: htmlContent,
  };

  sendEmail(mailOptions);
};

export const notifyUserApplicationSent = (userEmail, userFullName) => {
  const subject = "Application Received";
  const htmlContent = createApplicationSentTemplate(userFullName);
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: userEmail,
    subject: subject,
    html: htmlContent,
  };

  sendEmail(mailOptions);
};

export const notifyEmployerNewApplicant = (employerEmail, applicantFullName, jobTitle) => {
  const subject = "New Applicant Notification";
  const htmlContent = createNewApplicantTemplate(applicantFullName, jobTitle);
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: employerEmail,
    subject: subject,
    html: htmlContent,
  };
  // sendEmail(employerEmail, subject, htmlContent);
  sendEmail(mailOptions);
};

export const notifyUserInterviewScheduled = (
  userEmail,
  userFullName,
  jobTitle,
  interviewDate,
  interviewTime,
  employerName,
) => {
  const subject = "Interview Scheduled";
  const htmlContent = createInterviewScheduledTemplate(
    userFullName,
    jobTitle,
    interviewDate,
    interviewTime,
    employerName,
  );
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: userEmail,
    subject: subject,
    html: htmlContent,
  };

  sendEmail(mailOptions);
};

export const notifyUserApplicationRejected = (userEmail, userFullName, jobTitle) => {
  const subject = "Application Rejected";
  const htmlContent = createApplicationRejectedTemplate(userFullName, jobTitle);
  const mailOptions = {
    from: process.env.MY_EMAIL_ADDRESS,
    to: userEmail,
    subject: subject,
    html: htmlContent,
  };

  sendEmail(mailOptions);
};
