import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
}

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {job.company}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {job.location}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Posted: {job.postedDate}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" size="small">
          View Details
        </Button>
      </Box>
    </Card>
  );
};
