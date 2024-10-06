import { useAuth } from "@clerk/clerk-react";
import { NavigateBeforeRounded } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ErrorNotification } from "../../components/ErrorNotification";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Notification } from "../../components/Notification";
import { Project, UserProfile } from "../../interface";
import theme from "../../theme";

export const CandidateProfileUpdate: React.FC = () => {
  const [updatedData, setUpdatedData] = useState<UserProfile>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    city: "",
    resume: "",
    linkedInProfileLink: "",
    githubProfileLink: "",
    experience: [],
    skills: [],
    education: [],
    projects: [],
  });
  const [skills, setSkills] = useState<string[]>(updatedData.skills);
  const [newSkill, setNewSkill] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>(updatedData.projects);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useAuth();
  const [error, setError] = useState<{
    fullName?: string;
    city?: string;
    phoneNumber?: string;
    emailAddress?: string;
    linkedInProfileLink?: string;
    githubProfileLink?: string;
    resume?: string;
    skills?: string;
    education?: string;
    experience?: string;
  }>({});

  if (!user.isLoaded) {
    return <LoadingIndicator />;
  }
  const userId = user.userId;

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const fetchUserProfile = async () => {
    const url = import.meta.env.VITE_API_URL + `/employer/applicant-information/${userId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUpdatedData(data);
      setSkills(data.skills || []);
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      setUpdatedData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
    setSkills(updatedSkills);
    setUpdatedData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const handleAddProject = () => {
    setProjects((prevProjects) => [...prevProjects, { title: "", link: "", description: "" }]);
    setUpdatedData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { title: "", link: "", description: "" }],
    }));
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    setUpdatedData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setSelectedFile(file);

      try {
        const url = import.meta.env.VITE_API_URL + "/employer/upload";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setUpdatedData((prevData) => ({
            ...prevData,
            resume: data.url,
          }));
          <Notification
            showNotification={showNotification}
            handleCloseNotification={handleCloseNotification}
          />;
        } else {
          console.error("Error uploading file:", data.message);
          <Notification
            showNotification={showNotification}
            handleCloseNotification={handleCloseNotification}
            isRejected={true}
          />;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSave = async () => {
    const validationErrors: {
      fullName?: string;
      city?: string;
      phoneNumber?: string;
      emailAddress?: string;
      linkedInProfileLink?: string;
      githubProfileLink?: string;
      resume?: string;
      skills?: string;
      education?: string;
      experience?: string;
    } = {};

    if (
      !updatedData.fullName ||
      updatedData.fullName === "" ||
      updatedData.fullName === "fullName"
    ) {
      validationErrors.fullName = "Full name is required";
    }

    if (!updatedData.city || updatedData.city === "" || updatedData.city === "City") {
      validationErrors.city = "City is required";
    }

    if (
      !updatedData.phoneNumber ||
      updatedData.phoneNumber === "" ||
      updatedData.phoneNumber === "1234567890"
    ) {
      validationErrors.phoneNumber = "Phone number is required";
    }

    if (
      !updatedData.emailAddress ||
      updatedData.emailAddress === "" ||
      updatedData.emailAddress === "emailAddress"
    ) {
      validationErrors.emailAddress = "Email address is required";
    }

    if (!updatedData.resume) {
      validationErrors.resume = "Resume is required";
    }

    if (updatedData.skills.length === 0) {
      validationErrors.skills = "At least one skill is required";
    }

    if (updatedData.education.length === 0) {
      validationErrors.education = "All Education fields are required";
    }

    if (updatedData.experience.length === 0) {
      validationErrors.experience = "All Experience fields are required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    updateUserData();
  };

  const updateUserData = async () => {
    try {
      const url = import.meta.env.VITE_API_URL + `/employer/applicant-information/${userId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // const data = await response.json();
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setShowErrorNotification(true);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleAddExperience = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ],
    }));
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = updatedData.experience.filter((_, i) => i !== index);
    setUpdatedData((prevData) => ({
      ...prevData,
      experience: updatedExperience,
    }));
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 2, mb: 2 }}>
      {showErrorNotification ? (
        <ErrorNotification errorMessage={errorMessage} />
      ) : (
        <Box>
          
          <Card>{useMediaQuery(theme.breakpoints.down("md")) && (
            <Button
              sx={{
                width: ["-webkit-fill-available", "-moz-available", "100%"],
                height: "0rem",
              }}
              onClick={() => window.history.back()}
              variant="text"
              disableElevation
            >
              <NavigateBeforeRounded /> Return
            </Button>
          )}
            <CardContent>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                variant="outlined"
                value={updatedData.fullName || ""}
                onChange={handleInputChange}
                error={!!error.fullName}
                helperText={error.fullName}
              />
              <TextField
                sx={{ mt: 2 }}
                label="City"
                name="city"
                fullWidth
                variant="outlined"
                value={updatedData.city || ""}
                onChange={handleInputChange}
                error={!!error.city}
                helperText={error.city}
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                  sx={{ mr: 2 }}
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  variant="outlined"
                  value={updatedData.phoneNumber || ""}
                  onChange={handleInputChange}
                  error={!!error.phoneNumber}
                  helperText={error.phoneNumber}
                />
                <TextField
                  label="Email Address"
                  name="emailAddress"
                  fullWidth
                  variant="outlined"
                  value={updatedData.emailAddress || ""}
                  onChange={handleInputChange}
                  error={!!error.emailAddress}
                  helperText={error.emailAddress}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="LinkedIn Profile Link"
                  name="linkedInProfileLink"
                  fullWidth
                  variant="outlined"
                  value={updatedData.linkedInProfileLink || ""}
                  onChange={handleInputChange}
                  error={!!error.linkedInProfileLink}
                  helperText={error.linkedInProfileLink}
                />
                <TextField
                  sx={{ mt: 2 }}
                  label="GitHub Profile Link"
                  name="githubProfileLink"
                  fullWidth
                  variant="outlined"
                  value={updatedData.githubProfileLink || ""}
                  onChange={handleInputChange}
                  error={!!error.githubProfileLink}
                  helperText={error.githubProfileLink}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" component="label" fullWidth>
                  {selectedFile ? "Change Resume" : "Upload Resume"}
                  <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
                </Button>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Uploaded: {selectedFile.name}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
          {/* Education Section */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Education
              </Typography>
              <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ color: "white" }}
                  onClick={() => {
                    setUpdatedData((prevData) => ({
                      ...prevData,
                      education: [
                        ...prevData.education,
                        {
                          degree: "",
                          institution: "",
                          completionDate: "",
                        },
                      ],
                    }));
                  }}
                >
                  Add Education
                </Button>
              </Grid>

              {updatedData.education.map((education, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Degree"
                    value={education.degree || " "}
                    error={!!error.education}
                    helperText={error.education}
                    onChange={(e) => {
                      const updatedEducation = [...updatedData.education];
                      updatedEducation[index].degree = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        education: updatedEducation,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Institution"
                    value={education.institution || " "}
                    error={!!error.education}
                    helperText={error.education}
                    onChange={(e) => {
                      const updatedEducation = [...updatedData.education];
                      updatedEducation[index].institution = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        education: updatedEducation,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Completion Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!error.education}
                    helperText={error.education}
                    value={
                      education.completionDate ? formatDate(new Date(education.completionDate)) : ""
                    }
                    onChange={(e) => {
                      const updatedEducation = [...updatedData.education];
                      updatedEducation[index].completionDate = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        education: updatedEducation,
                      }));
                    }}
                  />
                  {updatedData.education.length > 1 && (
                    <IconButton
                      onClick={() => {
                        const updatedEducation = updatedData.education.filter(
                          (_, i) => i !== index,
                        );
                        setUpdatedData((prevData) => ({
                          ...prevData,
                          education: updatedEducation,
                        }));
                      }}
                      aria-label="delete"
                      color="error"
                      sx={{ mt: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Experience
              </Typography>
              <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleAddExperience}
                  sx={{ color: "white" }}
                >
                  Add Experience
                </Button>
              </Grid>

              {updatedData.experience.map((experience, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={experience.jobTitle || ""}
                    error={!!error.experience}
                    helperText={error.experience}
                    onChange={(e) => {
                      const updatedExperience = [...updatedData.experience];
                      updatedExperience[index].jobTitle = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        experience: updatedExperience,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Company"
                    value={experience.company || ""}
                    error={!!error.experience}
                    helperText={error.experience}
                    onChange={(e) => {
                      const updatedExperience = [...updatedData.experience];
                      updatedExperience[index].company = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        experience: updatedExperience,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!error.experience}
                    helperText={error.experience}
                    value={experience.startDate ? formatDate(new Date(experience.startDate)) : ""}
                    onChange={(e) => {
                      const updatedExperience = [...updatedData.experience];
                      updatedExperience[index].startDate = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        experience: updatedExperience,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!error.experience}
                    helperText={error.experience}
                    value={experience.endDate ? formatDate(new Date(experience.endDate)) : ""}
                    onChange={(e) => {
                      const updatedExperience = [...updatedData.experience];
                      updatedExperience[index].endDate = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        experience: updatedExperience,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Responsibilities"
                    value={experience.responsibilities || " "}
                    error={!!error.experience}
                    helperText={error.experience}
                    onChange={(e) => {
                      const updatedExperience = [...updatedData.experience];
                      updatedExperience[index].responsibilities = e.target.value;
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        experience: updatedExperience,
                      }));
                    }}
                  />
                  {updatedData.experience.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveExperience(index)}
                      aria-label="delete"
                      color="error"
                      sx={{ mt: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Skills
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Skill"
                    variant="outlined"
                    value={newSkill || ""}
                    onChange={(e) => setNewSkill(e.target.value)}
                    error={!!error.skills}
                    helperText={error.skills}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddSkill}
                    sx={{ color: "white", height: "60%" }}
                  >
                    Add Skill
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    color="primary"
                    sx={{ mr: 1, mb: 1, color: "white" }}
                    onDelete={() => handleDeleteSkill(skill)}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
          {/* Projects Section */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Projects
              </Typography>
              <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleAddProject}
                  sx={{ color: "white" }}
                >
                  Add Project
                </Button>
              </Grid>
              {projects.map((project, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Project Title"
                    value={project.title || " "}
                    onChange={(e) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index].title = e.target.value;
                      setProjects(updatedProjects);
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        projects: updatedProjects,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Project Link"
                    value={project.link || " "}
                    onChange={(e) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index].link = e.target.value;
                      setProjects(updatedProjects);
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        projects: updatedProjects,
                      }));
                    }}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Description"
                    value={project.description || " "}
                    multiline
                    rows={4}
                    onChange={(e) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index].description = e.target.value;
                      setProjects(updatedProjects);
                      setUpdatedData((prevData) => ({
                        ...prevData,
                        projects: updatedProjects,
                      }));
                    }}
                  />
                  {projects.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveProject(index)}
                      aria-label="delete"
                      color="error"
                      sx={{ mt: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
          <Box sx={{ m: 2 }}>
            <Button fullWidth variant="contained" sx={{ color: "white" }} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
