import { Box, Button, Card, CardContent, Chip, Grid, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../components/Notification";

const userProfile = {
  fullName: "Marce Ngcobo",
  phoneNumber: "0827654321",
  emailAddress: "marcengcobo@gmail.com",
  city: "Durban",
  resume: "resume_marce.pdf",
  linkedInProfileLink: "https://www.linkedin.com/in/thabo-dlamini",
  githubProfileLink: "https://github.com/thabodlamini",
  experience: [
    {
      jobTitle: "Data Analyst",
      company: "Insight Analytics",
      startDate: "2018-06-14",
      endDate: "2022-12-29",
      responsibilities:
        "Analyzed large datasets to extract actionable insights. Built data visualization dashboards using Power BI and Tableau.",
    },
  ],
  skills: ["Python", "Data Analysis", "Power BI", "SQL"],
  education: [
    {
      degree: "BCom Information Systems",
      institution: "University of KwaZulu-Natal",
      completionDate: "2014-11-30",
    },
  ],
  project: [
    {
      title: "Data Analysis Dashboard",
      link: "https://data-insights-dashboard.com",
      description:
        "Created an interactive data visualization dashboard using Python and Power BI, displaying insights on company sales and customer behavior.",
    },
  ],
};

export const EmployerProfile: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false); // State to manage notification visibility
  const [isRejected, setIsRejected] = useState(false);
  const navigate = useNavigate();
  const {
    fullName,
    phoneNumber,
    emailAddress,
    city,
    resume,
    linkedInProfileLink,
    githubProfileLink,
    experience,
    skills,
    education,
    project,
  } = userProfile;

  const handleAccept = () => {
    setShowNotification(true);
    setIsRejected(false);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  const handleReject = () => {
    setShowNotification(true);
    setIsRejected(true);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {fullName}
          </Typography>
          <Typography variant="subtitle1">{city}</Typography>
          <Typography variant="body1">
            <strong>Phone: </strong>
            {phoneNumber} | <strong>Email: </strong>
            <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>
          </Typography>

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              href={resume}
              sx={{ mr: 2, color: "white" }}
            >
              Download Resume
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href={linkedInProfileLink}
              target="_blank"
              sx={{ mr: 2 }}
            >
              LinkedIn Profile
            </Button>
            <Button variant="outlined" color="primary" href={githubProfileLink} target="_blank">
              GitHub Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6">{exp.jobTitle}</Typography>
              <Typography variant="subtitle1">{exp.company}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {new Date(exp.endDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {exp.responsibilities}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Skills
          </Typography>
          <Grid container spacing={1}>
            {skills.map((skill, index) => (
              <Grid item key={index}>
                <Chip label={skill} color="primary" sx={{ color: "white" }} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6">{edu.degree}</Typography>
              <Typography variant="subtitle1">{edu.institution}</Typography>
              <Typography variant="body2" color="textSecondary">
                Completed on: {new Date(edu.completionDate).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Projects
          </Typography>
          {project.map((proj, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6">{proj.title}</Typography>
              <Typography variant="body1">
                <strong>Link: </strong>
                <Link href={proj.link} target="_blank">
                  {proj.link}
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {proj.description}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="error" onClick={handleReject}>
          Reject
        </Button>
        <Button variant="outlined" onClick={handleAccept}>
          Accept
        </Button>
      </Box>

      <Notification
        showNotification={showNotification}
        handleCloseNotification={handleCloseNotification}
        isRejected={isRejected}
      />
    </Box>
  );
};
