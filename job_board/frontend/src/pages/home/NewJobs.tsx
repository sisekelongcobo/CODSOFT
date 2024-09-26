import { Box, Button, Card, CardContent, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../../components/TimeAgo";
import { Job } from "../../interface";

const jobsPerPage = 3;

export const NewJobs: React.FC = () => {
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = postedJobs?.slice(indexOfFirstJob, indexOfLastJob);
  const navigate = useNavigate();
  const jobCount = postedJobs?.length ?? 0;

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const fetchJobs = () => {
    const url = import.meta.env.VITE_API_URL + "/jobs/new-jobs";
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
      .catch((error) => console.error("Error fetching job data:", error));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleViewDetails = (job: Job) => {
    navigate("/job-details", { state: { job } });
  };

  return (
    <>
      <Grid container spacing={4}>
        {currentJobs.map((job) => (
          <Grid item xs={12} md={4} key={job.id}>
            <Card
              sx={{
                boxShadow: 3,
                ":hover": { boxShadow: 6 },
                transition: "box-shadow 0.3s",
                height: "14rem",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {job.title}
                </Typography>
                <Typography variant="subtitle1">{job.company}</Typography>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  {job.location}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  Posted <TimeAgo timestamp={job.createdAt} />
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleViewDetails(job)}
                >
                  View Job
                </Button>
              </CardContent>
            </Card>
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
    </>
  );
};
