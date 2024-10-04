import { TextField, Grid } from '@mui/material';

export const SocialMedia: React.FC = () => (
  <Grid container spacing={3}>

    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="LinkedIn" variant="outlined" />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="GitHub" variant="outlined" />
    </Grid>


  </Grid>
);
