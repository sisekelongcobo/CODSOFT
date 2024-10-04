import { Grid, TextField } from "@mui/material";

export const PersonalInfo: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Full Name" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Email" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Phone Number" variant="outlined" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Address/Location" variant="outlined" />
    </Grid>
  </Grid>
);
