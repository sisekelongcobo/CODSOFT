import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export const WorkExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    { jobTitle: "", company: "", startDate: "", endDate: "", responsibilities: "" },
  ]);

  const handleInputChange = (index: number, field: keyof Experience, value: string) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { jobTitle: "", company: "", startDate: "", endDate: "", responsibilities: "" },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddExperience}
        >
          Add Experience
        </Button>
      </Grid>

      {experiences.map((experience, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Experience {index + 1}
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  value={experience.jobTitle}
                  onChange={(e) => handleInputChange(index, "jobTitle", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  variant="outlined"
                  value={experience.company}
                  onChange={(e) => handleInputChange(index, "company", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={experience.startDate}
                  onChange={(e) => handleInputChange(index, "startDate", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={experience.endDate}
                  onChange={(e) => handleInputChange(index, "endDate", e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Responsibilities"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={experience.responsibilities}
                  onChange={(e) => handleInputChange(index, "responsibilities", e.target.value)}
                />
              </Grid>

              {experiences.length > 1 && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={() => handleRemoveExperience(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
