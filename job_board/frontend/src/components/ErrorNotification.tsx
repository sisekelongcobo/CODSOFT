import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ErrorNotificationProps {
  errorMessage: string;
  onRetry: () => void; // Function to retry the action
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ errorMessage, onRetry }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate to the previous page or home
    navigate("/");
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
          width: {
            xs: "90vw", // 90% width on extra-small screens
            sm: "70vw", // 70% width on small screens
            md: "50vw", // 50% width on medium screens
            lg: "30vw", // 30% width on large screens
          },
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold" color="error">
          An Error Occurred
        </Typography>

        <Typography variant="body1" gutterBottom color="textSecondary">
          {errorMessage}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={onRetry}
            sx={{
              px: 4,
              py: 1.5,
              width: {
                xs: "45%", // Button width adjustment for small screens
                sm: "auto", // Auto width for larger screens
              },
            }}
          >
            Retry
          </Button>

          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              px: 4,
              py: 1.5,
              color: "#1976d2", // Blue color for the outlined button
              borderColor: "#1976d2",
              "&:hover": {
                borderColor: "#115293", // Darker shade for hover
                backgroundColor: "rgba(25, 118, 210, 0.1)", // Light blue background on hover
              },
              width: {
                xs: "45%", // Button width adjustment for small screens
                sm: "auto", // Auto width for larger screens
              },
            }}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
