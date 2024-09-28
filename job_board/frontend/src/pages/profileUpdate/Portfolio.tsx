import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface Project {
  title: string;
  link: string;
  description: string;
}

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([{ title: "", link: "", description: "" }]);

  const handleInputChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: "", link: "", description: "" }]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} key={index}>
            <Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Project {index + 1}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Project Title"
                      variant="outlined"
                      value={project.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Project Link"
                      variant="outlined"
                      value={project.link}
                      onChange={(e) => handleInputChange(index, "link", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={project.description}
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => handleRemoveProject(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddProject}
          >
            Add Project
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
