import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TimeAgo } from "../../components/TimeAgo";
import { JobCardProps } from "../../interface";

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/job-details", { state: { job } });
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {job.company}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {job.location}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Posted: <TimeAgo timestamp={job.createdAt} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.jobType} - {job.workMode}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, display: "flex" }}>
        <Button variant="outlined" color="primary" size="small" onClick={handleViewDetails}>
          View Details
        </Button>
      </Box>
    </Card>
  );
};
