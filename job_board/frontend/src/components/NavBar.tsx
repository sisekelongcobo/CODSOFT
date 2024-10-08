import { SignOutButton, useAuth, useClerk } from "@clerk/clerk-react";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Job } from "../interface";
import { theme } from "../theme";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const { signOut } = useClerk();
  const { user } = useClerk();
  const userId = user?.id;

  const fetchUser = () => {
    const url = import.meta.env.VITE_API_URL + `/users/user-data`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const fetchMyJobs = () => {
    const url = import.meta.env.VITE_API_URL + `/jobs/my-jobs?userId=${userId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  const fetchMyApplications = () => {
    const url = import.meta.env.VITE_API_URL + `/users/applications?userId=${userId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => console.error("Error fetching applications:", error));
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUser();
      fetchMyJobs();
      fetchMyApplications();
    }
  }, [isSignedIn]);

  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography color="white" variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            JobBoard
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isSignedIn ? (
              <>
                <Button
                  color="inherit"
                  sx={{ mx: 1, color: "white" }}
                  onClick={() => handleMenuClick("/home")}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  sx={{ mx: 1, color: "white" }}
                  onClick={() => handleMenuClick("/job-listings")}
                >
                  Job Listings
                </Button>

                {/* Conditionally render Employer Dashboard */}
                {jobs.length > 0 && (
                  <Button
                    color="inherit"
                    sx={{ mx: 1, color: "white" }}
                    onClick={() => handleMenuClick("/employer-dashboard")}
                  >
                    Employer Dashboard
                  </Button>
                )}

                {/* Conditionally render Candidate Dashboard */}
                {applications.length > 0 && (
                  <Button
                    color="inherit"
                    sx={{ mx: 1, color: "white" }}
                    onClick={() => handleMenuClick("/candidate-dashboard")}
                  >
                    Candidate Dashboard
                  </Button>
                )}

                <Button
                  color="inherit"
                  sx={{ color: "white", mx: 1 }}
                  onClick={() => signOut({ redirectUrl: "/home" })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button color="inherit" sx={{ color: "white", mx: 1 }} onClick={handleLoginClick}>
                Login
              </Button>
            )}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <ListItem
              component={"button"}
              sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
              onClick={() => handleMenuClick("/home")}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={"button"}
              sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
              onClick={() => handleMenuClick("/job-listings")}
            >
              <ListItemText primary="Job Listings" />
            </ListItem>

            {/* Conditionally render Employer Dashboard in mobile */}
            {jobs.length > 0 && (
              <ListItem
                component={"button"}
                sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
                onClick={() => handleMenuClick("/employer-dashboard")}
              >
                <ListItemText primary="Employer Dashboard" />
              </ListItem>
            )}

            {/* Conditionally render Candidate Dashboard in mobile */}
            {applications.length > 0 && (
              <ListItem
                component={"button"}
                sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
                onClick={() => handleMenuClick("/candidate-dashboard")}
              >
                <ListItemText primary="Candidate Dashboard" />
              </ListItem>
            )}

            {isSignedIn && (
              <ListItem
                component={"button"}
                sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
              >
                <SignOutButton redirectUrl="/home">
                  <ListItemText primary="Sign Out" />
                </SignOutButton>
              </ListItem>
            )}
            {!isSignedIn && (
              <ListItem
                component={"button"}
                sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
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
