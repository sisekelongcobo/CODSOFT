import React from 'react';
import { Button } from '@mui/material';

export const Resume: React.FC = () => (
  <Button variant="outlined" component="label">
    Upload Resume
    <input type="file" hidden />
  </Button>
);
