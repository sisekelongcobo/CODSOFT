import { TextField, Grid } from '@mui/material';

export const JobPreferences: React.FC = () => (
  <Grid container spacing={3}>

    {/* Desired Job Titles */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Desired Job Titles" variant="outlined" />
    </Grid>

    {/* Preferred Locations */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Preferred Locations" variant="outlined" />
    </Grid>

    {/* Salary Expectations */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Salary Expectations" variant="outlined" />
    </Grid>

    {/* Availability */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Availability" variant="outlined" />
    </Grid>

  </Grid>
);
