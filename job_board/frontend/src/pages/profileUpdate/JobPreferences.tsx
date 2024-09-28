import { Grid, TextField } from "@mui/material";

export const JobPreferences: React.FC = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Desired Job Title" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Preferred Location" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Salary Expectation" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Availability" variant="outlined" />
    </Grid>
  </Grid>
);
