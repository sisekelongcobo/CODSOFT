import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Job } from "../../../interface";

export const EditJobDetails: React.FC = () => {
  const [jobDetails, setJobDetails] = useState<Job>({
    title: "",
    company: "",
    location: "",
    jobType: "",
    workMode: "",
    companyDescription: "",
    roleDescription: "",
    jobDescription: "",
    responsibilities: [],
    requirements: [],
    jobId: 0,
    userId: "",
    createdAt: "",
  });
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const location = useLocation();
  const { job } = location.state as { job: Job };
  const jobId = job.jobId;

  useEffect(() => {
    if (job) {
      setJobDetails(job);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>, field: string) => {
    setJobDetails({
      ...jobDetails,
      [field]: e.target.value as string,
    });
  };

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setJobDetails({
        ...jobDetails,
        responsibilities: [...jobDetails.responsibilities, newResponsibility],
      });
      setNewResponsibility("");
    }
  };

  const handleDeleteResponsibility = (index: number) => {
    const updatedResponsibilities = [...jobDetails.responsibilities];
    updatedResponsibilities.splice(index, 1);
    setJobDetails({
      ...jobDetails,
      responsibilities: updatedResponsibilities,
    });
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setJobDetails({
        ...jobDetails,
        requirements: [...jobDetails.requirements, newRequirement],
      });
      setNewRequirement("");
    }
  };

  const handleDeleteRequirement = (index: number) => {
    const updatedRequirements = [...jobDetails.requirements];
    updatedRequirements.splice(index, 1);
    setJobDetails({
      ...jobDetails,
      requirements: updatedRequirements,
    });
  };

  const handleSave = async () => {
    if (jobDetails.createdAt) {
      const createdAtDate = new Date(jobDetails.createdAt);
      jobDetails.createdAt = createdAtDate.toISOString().slice(0, 19).replace("T", " "); // Formats to "YYYY-MM-DD HH:MM:SS"
      setJobDetails({
        ...jobDetails,
        createdAt: createdAtDate.toISOString().slice(0, 19).replace("T", " "),
      });
    }
    console.log("Updated Job Details: ", jobDetails);

    try {
      const url = import.meta.env.VITE_API_URL + `/jobs/update-job/${jobId}`;
      console.log("URL: ", url);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });
      if (response.ok) {
        console.log("Job details updated successfully");
      } else {
        console.error("Failed to update job details");
      }
    } catch (error) {
      console.error("Failed to update job details: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4, p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Job Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Title"
              name="title"
              value={jobDetails.title}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={jobDetails.company}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={jobDetails.location}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel shrink>Job Type</InputLabel>
            <Select
              fullWidth
              value={jobDetails.jobType}
              // @ts-ignore
              onChange={(e) => handleSelectChange(e, "jobType")}
              variant="outlined"
            >
              <MenuItem disabled value="">
                Job Type
              </MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Temporary">Temporary</MenuItem>
              <MenuItem value="Seasonal">Seasonal</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel shrink>Work Mode</InputLabel>
            <Select
              fullWidth
              value={jobDetails.workMode}
              // @ts-ignore
              onChange={(e) => handleSelectChange(e, "workMode")}
              variant="outlined"
            >
              <MenuItem disabled value="">
                Work Mode
              </MenuItem>
              <MenuItem value="On-site">On-site</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Company Description"
              name="companyDescription"
              value={jobDetails.companyDescription}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Role Description"
              name="roleDescription"
              value={jobDetails.roleDescription}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Job Description"
              name="jobDescription"
              value={jobDetails.jobDescription}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          {/* Responsibilities */}
          <Grid item xs={12}>
            <Typography variant="h6">Responsibilities</Typography>
            <Grid container spacing={1}>
              {jobDetails.responsibilities.map((resp, index) => (
                <Grid item key={index}>
                  <Chip label={resp} onDelete={() => handleDeleteResponsibility(index)} />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Add New Responsibility"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  variant="outlined"
                />
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddResponsibility}
                    startIcon={<AddIcon />}
                    sx={{ mt: 1, color: "white" }}
                  >
                    Add Responsibility
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Requirements</Typography>
            <Grid container spacing={1}>
              {jobDetails.requirements.map((req, index) => (
                <Grid item key={index}>
                  <Chip label={req} onDelete={() => handleDeleteRequirement(index)} />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Add New Requirement"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  variant="outlined"
                />
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRequirement}
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ mt: 1, color: "white" }}
                  >
                    Add Requirement
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ color: "white" }}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
