import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { Job } from "../../interface";
import { JobCard } from "./JobCard";

const jobsPerPage = 6;

export const JobListingsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postedJobs, setPostedJobs] = useState<Job[]>();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>();

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs?.slice(indexOfFirstJob, indexOfLastJob);
  let jobCount = filteredJobs?.length ?? 0;

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
        setFilteredJobs(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredJobs(postedJobs);
    } else {
      const filtered = postedJobs?.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredJobs(filtered);
      setCurrentPage(1);
    }
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          Job Listings
        </Typography>
        <Box sx={{ mb: 4 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>

        <Grid container spacing={4}>
          {currentJobs?.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.jobId}>
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
