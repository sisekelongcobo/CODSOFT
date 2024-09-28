import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Unauthenticated: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/sign-in");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Authentication Required
        </Typography>

        <Typography variant="body1" gutterBottom color="textSecondary">
          You need to log in to continue. Please sign in to access this page.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            color: "white",
          }}
        >
          Log In
        </Button>
      </Paper>
    </Box>
  );
};
