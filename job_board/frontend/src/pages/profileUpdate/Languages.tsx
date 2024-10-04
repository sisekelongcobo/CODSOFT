import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Grid, TextField } from "@mui/material";

export const Languages: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField fullWidth label="Language" variant="outlined" />
      <TextField fullWidth label="Proficiency Level" variant="outlined" />
    </Grid>
    <Grid item xs={12}>
      <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
        Add Language
      </Button>
    </Grid>
  </Grid>
);
