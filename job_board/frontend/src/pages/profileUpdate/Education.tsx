import { Button, TextField, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Education: React.FC = () => (
  <Grid container spacing={3}>
    
    {/* Add Education Button */}
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
        Add Education
      </Button>
    </Grid>

    {/* Degree */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Degree" variant="outlined" />
    </Grid>

    {/* Institution */}
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Institution" variant="outlined" />
    </Grid>

    {/* Completion Date */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Completion Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>
  </Grid>
);
