import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Job } from "../../interface";

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { job } = location.state as { job: Job };
  let jobDetails: Job = job;

  console.log(jobDetails);

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
            Posted: {jobDetails.postedDate} | Type: {jobDetails.jobType} | Work Mode:{" "}
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
            <Typography variant="body1">{jobDetails.description}</Typography>
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
            <Button variant="outlined" onClick={() => navigate("/job-listings")}>
              Back to Job Listings
            </Button>
            <Button variant="contained" color="primary" onClick={handleApply}>
              Apply Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
