import { Button, Chip, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Skills: React.FC = () => (
  <Grid container spacing={3}>

    {/* Add Skill Button */}
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
        Add Skill
      </Button>
    </Grid>

    {/* Skills List */}
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item>
          <Chip label="JavaScript" onDelete={() => {}} color="primary" />
        </Grid>
        <Grid item>
          <Chip label="Leadership" onDelete={() => {}} color="secondary" />
        </Grid>
        {/* Add more skills as needed */}
      </Grid>
    </Grid>
    
  </Grid>
);
