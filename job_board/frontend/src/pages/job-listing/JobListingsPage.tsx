import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { JobCard } from "./JobCard";
import { Job } from "../../interface";

const jobsPerPage = 6;

export const JobListingsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postedJobs, setPostedJobs] = useState<Job[]>();
  
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = postedJobs?.slice(indexOfFirstJob, indexOfLastJob);
  let jobCount = postedJobs?.length ?? 0;
  
  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const fetchJobs = () => {
    const url = import.meta.env.VITE_API_URL + "/jobs/all-jobs";  
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setPostedJobs(data);
      })
      .catch((error) => console.error("Error fetching user data:", error)); // Handle errors
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          Job Listings
        </Typography>
        <Box sx={{ mb: 4 }}>
          <SearchBar />
        </Box>

        <Grid container spacing={4}>
          {currentJobs?.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={Math.ceil(jobCount / jobsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
};
