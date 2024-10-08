import { useClerk } from "@clerk/clerk-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { theme } from "../../../theme";

export const NewJobForm = () => {
  const [workMode, setWorkMode] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    workMode: "",
    companyDescription: "",
    roleDescription: "",
    jobDescription: "",
    responsibilities: [""],
    requirements: [""],
  });
  const [error, setError] = useState<{
    title?: string;
    company?: string;
    location?: string;
    jobTpye?: string;
    workMode?: string;
    companyDescription?: string;
    roleDescription?: string;
    jobDescription?: string;
    responsibilities?: string;
    requirements?: string;
  }>({});
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useClerk();
  const userId = user?.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkMode(e.target.value as string);
    setJobData({ ...jobData, workMode: e.target.value });
  };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobType(e.target.value as string);
    setJobData({ ...jobData, jobType: e.target.value });
  };

  const handleArrayChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
    field: "responsibilities" | "requirements",
  ) => {
    const updatedArray = [...jobData[field]];
    updatedArray[index] = e.target.value;
    setJobData({ ...jobData, [field]: updatedArray });
  };

  const handleAddField = (field: "responsibilities" | "requirements") => {
    setJobData({
      ...jobData,
      [field]: [...jobData[field], ""],
    });
  };

  const handleSubmit = () => {
    const validationErrors: {
      title?: string;
      company?: string;
      location?: string;
      jobType?: string;
      workMode?: string;
      companyDescription?: string;
      roleDescription?: string;
      jobDescription?: string;
      responsibilities?: string;
      requirements?: string;
    } = {};
    if (!jobData.title) {
      validationErrors.title = "Title is required";
    }

    if (!jobData.company) {
      validationErrors.company = "Company is required";
    }

    if (!jobData.location) {
      validationErrors.location = "Location is required";
    }

    if (!jobData.jobType) {
      validationErrors.jobType = "Job Type is required";
    }

    if (!jobData.workMode) {
      validationErrors.workMode = "Work Mode is required";
    }

    if (!jobData.companyDescription) {
      validationErrors.companyDescription = "Company Description is required";
    }

    if (!jobData.roleDescription) {
      validationErrors.roleDescription = "Role Description is required";
    }

    if (!jobData.jobDescription) {
      validationErrors.jobDescription = "Job Description is required";
    }

    if (jobData.responsibilities.includes("")) {
      validationErrors.responsibilities = "Responsibilities cannot be empty";
    }

    if (jobData.requirements.includes("")) {
      validationErrors.requirements = "Requirements cannot be empty";
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const url = import.meta.env.VITE_API_URL + `/jobs/create-job?userId=${userId}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jobData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error creating job:", error));
    } catch (error) {
      console.error("Error creating job:", error);
    }
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: "70vw", width: "100%", padding: 3 }}>
        <CardContent>
          <Typography variant={isMobile ? "h6" : "h4"} align="center" gutterBottom>
            Create New Job
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                variant="outlined"
                error={!!error.title}
                helperText={error.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                variant="outlined"
                error={!!error.company}
                helperText={error.company}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                variant="outlined"
                error={!!error.location}
                helperText={error.location}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel shrink>Job Type</InputLabel>
              <Select
                fullWidth
                value={jobType}
                // @ts-ignore
                onChange={handleJobTypeChange}
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
                value={workMode}
                // @ts-ignore
                onChange={handleWorkModeChange}
                variant="outlined"
              >
                <MenuItem disabled value="">
                  Work Mode
                </MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="On-site">On-site</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Description"
                name="companyDescription"
                value={jobData.companyDescription}
                onChange={handleChange}
                variant="outlined"
                error={!!error.companyDescription}
                helperText={error.companyDescription}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role Description"
                name="roleDescription"
                value={jobData.roleDescription}
                onChange={handleChange}
                error={!!error.roleDescription}
                helperText={error.roleDescription}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleChange}
                error={!!error.jobDescription}
                helperText={error.jobDescription}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Responsibilities</Typography>
            </Grid>
            {jobData.responsibilities.map((responsibility, index) => (
              <Grid item xs={12} key={`responsibility-${index}`}>
                <TextField
                  fullWidth
                  label={`Responsibility ${index + 1}`}
                  value={responsibility}
                  error={!!error.responsibilities}
                  helperText={error.responsibilities}
                  // @ts-ignore
                  onChange={(e) => handleArrayChange(index, e, "responsibilities")}
                  variant="outlined"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleAddField("responsibilities")}
              >
                Add Responsibility
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Requirements</Typography>
            </Grid>
            {jobData.requirements.map((requirement, index) => (
              <Grid item xs={12} key={`requirement-${index}`}>
                <TextField
                  fullWidth
                  label={`Requirement ${index + 1}`}
                  value={requirement}
                  error={!!error.requirements}
                  helperText={error.requirements}
                  //@ts-ignore
                  onChange={(e) => handleArrayChange(index, e, "requirements")}
                  variant="outlined"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={() => handleAddField("requirements")}>
                Add Requirement
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white" }}
                fullWidth
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
