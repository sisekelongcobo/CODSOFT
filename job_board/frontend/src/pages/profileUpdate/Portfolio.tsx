import { Button, TextField, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Portfolio: React.FC = () => (
  <Grid container spacing={3}>

    {/* Project Details */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Project Title" variant="outlined" />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Project Link" variant="outlined" />
    </Grid>

    <Grid item xs={12}>
      <TextField fullWidth label="Project Description" variant="outlined" multiline rows={4} />
    </Grid>

    {/* Add Project Button */}
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
        Add Project
      </Button>
    </Grid>
  </Grid>
);
