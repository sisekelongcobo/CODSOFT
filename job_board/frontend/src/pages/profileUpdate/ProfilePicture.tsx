import React from 'react';
import { Avatar, Button, Grid } from '@mui/material';

export const ProfilePicture: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Avatar src="/profile-pic-url" sx={{ width: 100, height: 100 }} />
      <Button variant="outlined" component="label" sx={{ mt: 2 }}>
        Upload Picture
        <input type="file" hidden />
      </Button>
    </Grid>
  </Grid>
);
