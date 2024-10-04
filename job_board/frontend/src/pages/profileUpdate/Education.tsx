import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface EducationEntry {
  degree: string;
  institution: string;
  completionDate: string;
}

export const Education: React.FC = () => {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    { degree: "", institution: "", completionDate: "" },
  ]);

  const handleInputChange = (index: number, field: keyof EducationEntry, value: string) => {
    const newEntries = [...educationEntries];
    newEntries[index][field] = value;
    setEducationEntries(newEntries);
  };

  const handleAddEducation = () => {
    setEducationEntries([...educationEntries, { degree: "", institution: "", completionDate: "" }]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEntries = educationEntries.filter((_, i) => i !== index);
    setEducationEntries(newEntries);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddEducation}
        >
          Add Education
        </Button>
      </Grid>

      {educationEntries.map((entry, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Education {index + 1}
          </Typography>
          <Grid container spacing={3} alignItems="center">
            {/* Degree and Institution */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                variant="outlined"
                value={entry.degree}
                onChange={(e) => handleInputChange(index, "degree", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institution"
                variant="outlined"
                value={entry.institution}
                onChange={(e) => handleInputChange(index, "institution", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Completion Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={entry.completionDate}
                onChange={(e) => handleInputChange(index, "completionDate", e.target.value)}
              />
            </Grid>

            {educationEntries.length > 1 && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => handleRemoveEducation(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
