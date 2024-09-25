import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const jobs = [
  { title: "Software Engineer", company: "Tech Corp", location: "New York, NY" },
  { title: "Marketing Specialist", company: "Creative Agency", location: "San Francisco, CA" },
  { title: "Product Manager", company: "Startup Inc.", location: "Remote" },
];

export const FeaturedJobs: React.FC = () => {
  return (
    <Grid container spacing={4}>
      {jobs.map((job, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card
            sx={{
              boxShadow: 3,
              ":hover": { boxShadow: 6 },
              transition: "box-shadow 0.3s",
              height: "12rem",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {job.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {job.company}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {job.location}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                View Job
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
