import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Chip, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<string[]>(["JavaScript", "Leadership"]);
  const [newSkill, setNewSkill] = useState<string>("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="New Skill"
          variant="outlined"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddSkill}>
          Add Skill
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {skills.map((skill, index) => (
            <Grid item key={index}>
              <Chip label={skill} onDelete={() => handleDeleteSkill(skill)} color="primary" />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
