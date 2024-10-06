import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "../../../components/ErrorNotification";
import { TimeAgo } from "../../../components/TimeAgo";
import { Job } from "../../../interface";

export const CandidateDashboard: React.FC = () => {
  const [userData, setUserData] = useState({ fullName: "", role: "", imageUrl: "", userId: "" });
  const navigate = useNavigate();

  const [appliedJobs, setAppliedJobs] = useState<Job[]>();

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const fetchUser = () => {
    const url = import.meta.env.VITE_API_URL + "/users/user-data";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const fetchAppliedJobs = () => {
    const url = import.meta.env.VITE_API_URL + "/users/applications";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppliedJobs(data);
      })
      .catch((error) => console.error("Error fetching applied jobs:", error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  if (!userData) {
    return (
      <ErrorNotification
        errorMessage="You need to be signed in to view this page."
        onRetry={() => navigate("/sign-in")}
      />
    );
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
        Candidate Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white" }}
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Applied Jobs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliedJobs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="h6">You have not applied to any jobs yet.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              appliedJobs?.map((job) => (
                <TableRow key={job.jobId}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>
                    <TimeAgo timestamp={job.appliedDate as string} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
