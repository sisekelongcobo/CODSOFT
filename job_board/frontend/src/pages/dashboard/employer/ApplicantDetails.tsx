import { Box, Button, Card, CardContent, Chip, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { Notification } from "../../../components/Notification";
import { Project, UserProfile } from "../../../interface";

export const ApplicantDetails: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false); // State to manage notification visibility
  const [isRejected, setIsRejected] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Ensure UserProfile is nullable
  const location = useLocation();
  const { applicantId, jobId } = location.state as { applicantId: string; jobId: number };
  const navigate = useNavigate();

  const handleAccept = async () => {
    const url = `${import.meta.env.VITE_API_URL}/employer/applicants/confirm/${applicantId}/${jobId}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error accepting applicant: ${response.statusText}`);
      }

      sendNotificationEmailApplicationAccepted();
      setShowNotification(true);
      setIsRejected(false);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  const handleReject = () => {
    const url = `${import.meta.env.VITE_API_URL}/employer/applicants/reject/${applicantId}/${jobId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error rejecting applicant: ${response.statusText}`);
        }

        setShowNotification(true);
        setIsRejected(false);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      })
      .catch((error) => console.error("Error rejecting applicant:", error));
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const fetchApplicantData = async () => {
    const url = `${import.meta.env.VITE_API_URL}/employer/applicant-information/${applicantId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error fetching applicant data: ${response.statusText}`);
      }

      const data = await response.json();

      if (typeof data === "object") {
        setUserProfile(data);
      } else {
        console.error("Expected object but got:", data);
      }
    } catch (error) {
      console.error("Error fetching applicant data:", error);
    }
  };

  useEffect(() => {
    fetchApplicantData();
  }, []);

  if (!userProfile) {
    return <LoadingIndicator />;
  }

  const {
    fullName,
    phoneNumber,
    emailAddress,
    city,
    resume,
    linkedInProfileLink,
    githubProfileLink,
    experience = [],
    skills = [],
    education = [],
    projects = [],
  } = userProfile;

  const sendNotificationEmailApplicationAccepted = async () => {
    const url = `${import.meta.env.VITE_API_URL}/email/application-accepted`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          jobId: jobId,
          userFullName: userProfile.fullName,
          userEmail: userProfile.emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error sending email: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
            {resume && (
              <Button
                variant="contained"
                color="primary"
                href={resume}
                target="_blank"
                sx={{ mr: 2, color: "white" }}
              >
                Download Resume
              </Button>
            )}
            {linkedInProfileLink && (
              <Button
                variant="outlined"
                color="primary"
                href={linkedInProfileLink}
                target="_blank"
                sx={{ mr: 2 }}
              >
                LinkedIn Profile
              </Button>
            )}
            {githubProfileLink && (
              <Button variant="outlined" color="primary" href={githubProfileLink} target="_blank">
                GitHub Profile
              </Button>
            )}
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
                {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
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
          {projects.map((proj: Project, index: any) => (
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
        message="Applicant has been accepted!"
      />
    </Box>
  );
};
