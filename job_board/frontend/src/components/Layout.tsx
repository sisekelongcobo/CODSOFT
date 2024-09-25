import React from 'react';
import { Box } from '@mui/material';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar/>

      <Box sx={{ my: 1, minHeight: 'calc(100vh - 64px)', paddingBottom: '50px' }}>
        {children}
      </Box>
      {/* @ts-ignore */}
      <Footer sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} />
    </>
  );
};
