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
import theme from "../theme";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [user, setUser] = useState<any>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { signOut } = useClerk();

  const fetchUser = () => {
    const url = import.meta.env.VITE_API_URL + "/users/user-data";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUser();
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
                {["Home", "Job Listings", "Employer Dashboard", "Candidate Dashboard"].map(
                  (menu) => (
                    <Button
                      key={menu}
                      color="inherit"
                      sx={{ mx: 1, color: "white" }}
                      onClick={() => handleMenuClick(`/${menu.toLowerCase().replace(/\s/g, "-")}`)}
                    >
                      {menu}
                    </Button>
                  ),
                )}
                <Button
                  key={"signout"}
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

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {["Home", "Job Listings", "Employer Dashboard", "Candidate Dashboard"].map((menu) => (
              <ListItem
                component={"button"}
                sx={{ backgroundColor: theme.palette.background.paper, border: "none" }}
                key={menu}
                onClick={() => handleMenuClick(`/${menu.toLowerCase().replace(/\s/g, "-")}`)}
              >
                <ListItemText primary={menu} />
              </ListItem>
            ))}
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
