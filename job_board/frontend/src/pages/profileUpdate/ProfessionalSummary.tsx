import { TextField } from '@mui/material';

export const ProfessionalSummary: React.FC = () => (
  <TextField
    fullWidth
    label="Summary/Bio"
    variant="outlined"
    multiline
    rows={4}
  />
);
