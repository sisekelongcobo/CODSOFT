import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Grid, TextField } from "@mui/material";

export const WorkExperience: React.FC = () => (
  <Grid container spacing={3}>

    {/* Add Experience Button */}
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
        Add Experience
      </Button>
    </Grid>

    {/* Job Title and Company */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Job Title" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Company" variant="outlined" />
    </Grid>

    {/* Start Date and End Date */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>

    {/* Responsibilities */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Responsibilities"
        variant="outlined"
        multiline
        rows={4}
      />
    </Grid>

  </Grid>
);
