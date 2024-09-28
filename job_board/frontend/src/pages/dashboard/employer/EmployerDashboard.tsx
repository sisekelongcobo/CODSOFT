import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  Pagination,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { NewJobForm } from './NewJobForm'; // Import the form
import { PendingApplications } from './PendingApplications';

const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Looking for a skilled software engineer.",
    applications: 5,
  },
  {
    id: 2,
    title: "Product Manager",
    description: "Seeking a product manager to lead our team.",
    applications: 3,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description: "Hiring a UI/UX designer for our new project.",
    applications: 8,
  },
  {
    id: 4,
    title: "Software Engineer",
    description: "Looking for a skilled software engineer.",
    applications: 5,
  },
  {
    id: 5,
    title: "Product Manager",
    description: "Seeking a product manager to lead our team.",
    applications: 3,
  },
  {
    id: 6,
    title: "UI/UX Designer",
    description: "Hiring a UI/UX designer for our new project.",
    applications: 8,
  },
  {
    id: 7,
    title: "Software Engineer",
    description: "Looking for a skilled software engineer.",
    applications: 5,
  },
  {
    id: 8,
    title: "Product Manager",
    description: "Seeking a product manager to lead our team.",
    applications: 3,
  },
  {
    id: 9,
    title: "UI/UX Designer",
    description: "Hiring a UI/UX designer for our new project.",
    applications: 8,
  },
];

function CustomTabPanel({ children, value, index, ...other }: any) {
  return (
    <section
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ paddingTop: '1rem' }}
    >
      {value === index && children}
    </section>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const EmployerDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const jobsPerPage = 6;

  //@ts-ignore
  const handleChangeTab = (event: any, newValue: any) => {
    setValue(newValue);
  };

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = mockJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employer Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2, color: 'white' }}
        onClick={handleOpenModal}
      >
        Post a New Job
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        {/* @ts-ignore */}
        <NewJobForm handleClose={handleCloseModal} />
      </Dialog>

      <Typography variant="h6" gutterBottom>
        Your Job Postings
      </Typography>

      <Grid container spacing={3}>
        {currentJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Applications: {job.applications}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => alert(`Editing job: ${job.title}`)}
                >
                  Edit Job
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: 2, marginLeft: 1 }}
                  onClick={() => alert(`Deleting job: ${job.title}`)}
                >
                  Delete Job
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(mockJobs.length / jobsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, justifyContent: 'center', display: 'flex' }}
      />

      <Paper sx={{ marginTop: 4, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Application Status
        </Typography>
        <Typography variant="body2">
          View and manage the status of applications for your job postings.
        </Typography>
        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="Pending Applications" {...a11yProps(0)} />
            <Tab label="Approved Applications" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <CustomTabPanel value={value} index={0}>
          <PendingApplications />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Approved Applications
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};
