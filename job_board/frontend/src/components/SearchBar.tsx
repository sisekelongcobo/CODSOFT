import React from 'react';
import { TextField, Button, Box } from '@mui/material';

export const SearchBar: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <TextField
        label="Search for jobs..."
        variant="outlined"
        sx={{ width: '60%', boxShadow: 1 }}
      />
      <Button variant="contained" color="primary" sx={{ ml: 2, py: 1.5, px: 4 }}>
        Search
      </Button>
    </Box>
  );
};
