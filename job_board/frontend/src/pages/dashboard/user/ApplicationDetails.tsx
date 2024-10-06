import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Assuming React Router
import { ErrorNotification } from "../../../components/ErrorNotification";

// Mock data (replace this with actual fetched data)
const mockApplications = [
  {
    id: 1,
    job: "Software Engineer",
    applicant: "John Doe",
    status: "Pending",
    date: "2023-10-01",
    coverLetter: "Lorem ipsum...",
    resume: "resume1.pdf",
  },
  {
    id: 2,
    job: "Product Manager",
    applicant: "Jane Smith",
    status: "Accepted",
    date: "2023-09-25",
    coverLetter: "Lorem ipsum...",
    resume: "resume2.pdf",
  },
  {
    id: 3,
    job: "UI/UX Designer",
    applicant: "Alice Johnson",
    status: "Rejected",
    date: "2023-09-18",
    coverLetter: "Lorem ipsum...",
    resume: "resume3.pdf",
  },
];

export const ApplicationDetail: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const application = mockApplications.find((app) => app.id === parseInt(applicationId ?? "", 10));

  if (!application) {
    return <ErrorNotification errorMessage="Application not found" />;
  }

  return (
    <Paper sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Application Details
      </Typography>

      <Typography variant="h6" gutterBottom>
        Job Title: {application.job}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Applicant Name: {application.applicant}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Status: {application.status}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Application Date: {application.date}
      </Typography>

      <Button
        variant="contained"
        sx={{ marginTop: 2, color: "white" }}
        onClick={() => alert(`Downloading resume for ${application.applicant}`)}
      >
        Download Resume
      </Button>

      <Button variant="outlined" sx={{ marginTop: 2, marginLeft: 2 }} onClick={() => navigate(-1)}>
        Back to Applications
      </Button>
    </Paper>
  );
};
