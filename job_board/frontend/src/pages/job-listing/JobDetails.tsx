import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorNotification } from "../../components/ErrorNotification";
import TimeAgo from "../../components/TimeAgo";
import { Job } from "../../interface";

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnRetry = () => {
    window.location.reload();
  };
  
  if (location.state == null) {
    return <ErrorNotification onRetry={handleOnRetry} errorMessage="Job Not Found" />;
  }
  const { job } = location.state as { job: Job };
  let jobDetails: Job = job;

  const handleApply = () => {
    alert("Navigate to the application form for job ID: " + id);
  };

  return (
    <Container sx={{ mt: 1, mb: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            {jobDetails.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
            {jobDetails.company} - {jobDetails.location}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Posted: <TimeAgo timestamp={job.createdAt} /> | Type: {jobDetails.jobType} | Work Mode:{" "}
            {jobDetails.workMode}
          </Typography>

          <Box sx={{ mb: 4, p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Company Description
            </Typography>
            <Typography variant="body1">{jobDetails.companyDescription}</Typography>
          </Box>

          <Box sx={{ mb: 4, p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Role Description
            </Typography>
            <Typography variant="body1">{jobDetails.roleDescription}</Typography>
          </Box>

          <Box sx={{ mb: 4, p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Job Description
            </Typography>
            <Typography variant="body1">{jobDetails.jobDescription}</Typography>
          </Box>

          <Box sx={{ mb: 4, p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Responsibilities
            </Typography>
            <ul>
              {jobDetails.responsibilities.map((responsibility, index) => (
                <li key={index}>
                  <Typography variant="body1">{responsibility}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ mb: 4, p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Requirements
            </Typography>
            <ul>
              {jobDetails.requirements.map((requirement, index) => (
                <li key={index}>
                  <Typography variant="body1">{requirement}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back to Previous Page
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "white" }}
              onClick={handleApply}
            >
              Apply Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
