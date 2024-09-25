import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Pagination } from '@mui/material';
import {SearchBar} from '../../components/SearchBar';
import { JobCard } from './JobCard';

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York, NY', postedDate: '2 days ago' },
  { id: 2, title: 'Marketing Specialist', company: 'Creative Agency', location: 'San Francisco, CA', postedDate: '1 week ago' },
  { id: 3, title: 'Product Manager', company: 'Startup Inc.', location: 'Remote', postedDate: '3 days ago' },
  { id: 4, title: 'Software Engineer', company: 'Tech Corp', location: 'New York, NY', postedDate: '2 days ago' },
  { id: 5, title: 'Marketing Specialist', company: 'Creative Agency', location: 'San Francisco, CA', postedDate: '1 week ago' },
  { id: 6, title: 'Product Manager', company: 'Startup Inc.', location: 'Remote', postedDate: '3 days ago' },
  { id: 7, title: 'Software Engineer', company: 'Tech Corp', location: 'New York, NY', postedDate: '2 days ago' },
  { id: 8, title: 'Marketing Specialist', company: 'Creative Agency', location: 'San Francisco, CA', postedDate: '1 week ago' },
  { id: 9, title: 'Product Manager', company: 'Startup Inc.', location: 'Remote', postedDate: '3 days ago' },
];

const jobsPerPage = 6;

export const JobListingsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Job Listings
        </Typography> 
        <Box sx={{ mb: 4 }}>
          <SearchBar />
        </Box>

        <Grid container spacing={4}>
          {currentJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={Math.ceil(jobs.length / jobsPerPage)} // Calculate the total number of pages
            page={currentPage} // Pass the current page to the Pagination component
            onChange={handlePageChange} // Handle page change
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
};
