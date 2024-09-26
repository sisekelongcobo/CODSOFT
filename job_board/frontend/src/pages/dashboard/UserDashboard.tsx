import React, { useState } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock applied jobs data for demonstration
const mockAppliedJobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', status: 'Pending', appliedDate: '3 days ago' },
  { id: 2, title: 'Product Manager', company: 'Innovate LLC', status: 'Interview Scheduled', appliedDate: '1 week ago' },
];

export const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();
  //@ts-ignore
  const [appliedJobs, setAppliedJobs] = useState(mockAppliedJobs);

  const handleViewJob = (id: number) => {
    // Logic to navigate to the job details page
    navigate(`/job/${id}`);
  };

  const handleUpdateProfile = () => {
    // Logic to navigate to profile update form
    navigate('/update-profile');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
        Candidate Dashboard
      </Typography>

      {/* Update Profile Button */}
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Box>

      {/* Applied Jobs Table */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>{job.appliedDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleViewJob(job.id)} sx={{ mr: 1 }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
