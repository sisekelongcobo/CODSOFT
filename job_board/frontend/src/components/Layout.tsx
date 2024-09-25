import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>      
      <NavBar/>

      <Box sx={{ my: 1 }}>
        {children}
      </Box>

      <Footer/>
    </>
  );
};
