import { useClerk } from "@clerk/clerk-react";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "../../../components/ErrorNotification";
import { Job } from "../../../interface";
import { ApproveApplications } from "./ApproveApplications";
import { NewJobForm } from "./NewJobForm";
import { PendingApplications } from "./PendingApplications";

function CustomTabPanel({ children, value, index, ...other }: any) {
  return (
    <section
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ paddingTop: "1rem" }}
    >
      {value === index && children}
    </section>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const EmployerDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [myJobOpenings, setMyJobOpenings] = useState<Job[]>([]);
  const jobsPerPage = 6;
  const navigate = useNavigate();
  const { user } = useClerk();
  const userId = user?.id;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = myJobOpenings.slice(indexOfFirstJob, indexOfLastJob);
  const jobCount = myJobOpenings?.length ?? 0;

  const fetchJobs = async () => {
    const url = import.meta.env.VITE_API_URL + `/jobs/my-jobs?userId=${userId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setMyJobOpenings(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  //@ts-ignore
  const handleChangeTab = (event: any, newValue: any) => {
    setValue(newValue);
  };

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const handleEditJob = (job: Job) => {
    navigate(`/edit-job/${job.jobId}`, { state: { job } });
  };

  const handleDeleteJob = (jobId: any) => {
    const url = import.meta.env.VITE_API_URL + `/jobs/delete-job/${jobId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Job deleted successfully") {
          fetchJobs();
          showNotification(data.message);
        } else showNotification(data.message);
        fetchJobs();
      })
      .catch((error) => console.error("Error deleting job:", error));
  };
  const showNotification = (message: string) => {
    return <ErrorNotification errorMessage={message} />;
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employer Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2, color: "white" }}
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
      {jobCount === 0 ? (
        <Typography variant="body2" gutterBottom>
          You have not posted any jobs yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {currentJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.jobId}>
              <Card sx={{ height: "12rem", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncateDescription(job.jobDescription, 100)}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {truncateDescription(job.location, 20)} | {job.jobType}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", padding: "0 0 10px 15px" }}>
                  <Button variant="outlined" color="primary" onClick={() => handleEditJob(job)}>
                    Edit Job
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleDeleteJob(job.jobId)}
                  >
                    Delete Job
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        count={Math.ceil(jobCount / jobsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2, justifyContent: "center", display: "flex" }}
      />

      <Paper sx={{ marginTop: 4, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Application Status
        </Typography>
        <Typography variant="body2">
          View and manage the status of applications for your job postings.
        </Typography>
        <Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="Pending Applications" {...a11yProps(0)} />
            <Tab label="Approved Applications" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <CustomTabPanel value={value} index={0}>
          <PendingApplications />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ApproveApplications />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};
