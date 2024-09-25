import React, { useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import theme from '../theme';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false); // Manage drawer state

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Close drawer after navigation
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography color='white' variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            JobBoard
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {/* Hide on small screens */}
            {['Home', 'Job Listings', 'Employer Dashboard', 'Candidate Dashboard'].map((menu) => (
              <Button key={menu} color="inherit" sx={{ mx: 1, color: "white" }} onClick={() => handleMenuClick(`/${menu.toLowerCase().replace(/\s/g, '-')}`)}>
                {menu}
              </Button>
            ))}
            {isSignedIn && <Avatar src={user?.imageUrl} />} {/* Avatar for larger screens */}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' } }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {['Home', 'Job Listings', 'Employer Dashboard', 'Candidate Dashboard'].map((menu) => (
               
              <ListItem 
                component={"button"} 
                sx={{backgroundColor: theme.palette.background.paper, border: 'none'}} 
                key={menu} 
                onClick={() => handleMenuClick(`/${menu.toLowerCase().replace(/\s/g, '-')}`)}
              >
                <ListItemText primary={menu} />
              </ListItem>
            ))}
            {isSignedIn && (
              <ListItem
                component={"button"} 
                sx={{backgroundColor: theme.palette.background.paper, border: 'none'}} 
              >
                <SignOutButton redirectUrl='/home'>
                  <ListItemText primary="Sign Out" />
                </SignOutButton>
              </ListItem>
            )}
            {!isSignedIn && (
              
              <ListItem 
                component={"button"} 
                sx={{backgroundColor: theme.palette.background.paper, border: 'none'}} 
                onClick={handleLoginClick}
              >
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
