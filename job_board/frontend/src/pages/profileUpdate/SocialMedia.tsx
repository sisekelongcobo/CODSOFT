import { TextField, Grid } from '@mui/material';

export const SocialMedia: React.FC = () => (
  <Grid container spacing={3}>

    {/* LinkedIn Field */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="LinkedIn" variant="outlined" />
    </Grid>

    {/* GitHub Field */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="GitHub" variant="outlined" />
    </Grid>

    {/* Behance Field */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Behance" variant="outlined" />
    </Grid>

  </Grid>
);
