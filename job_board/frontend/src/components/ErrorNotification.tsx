import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ErrorNotificationProps {
  errorMessage: string;
  onRetry?: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ errorMessage, onRetry }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
        {onRetry ? (
          <Typography variant="h5" gutterBottom fontWeight="bold" color="error">
            An Error Occurred
          </Typography>
        ) : null}

        <Typography variant="body1" gutterBottom color="textSecondary">
          {errorMessage}
        </Typography>

        <Box display="flex" justifyContent={onRetry ? "space-between" : "center"} mt={2}>
          {onRetry ? (
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
          ) : null}

          <Button
            variant={onRetry ? "outlined" : "contained"}
            onClick={handleBack}
            sx={{
              px: 4,
              py: 1.5,
              color: onRetry ? "#1976d2" : "#fff", // White text if it's the "Okay" button
              borderColor: onRetry ? "#1976d2" : "none",
              backgroundColor: onRetry ? "none" : "#1976d2", // Blue background for "Okay"
              "&:hover": {
                borderColor: onRetry ? "#115293" : "none", // Adjust border on hover for "Retry"
                backgroundColor: onRetry ? "rgba(25, 118, 210, 0.1)" : "#115293", // Adjust background for "Okay" on hover
              },
              width: {
                xs: "45%", // Button width adjustment for small screens
                sm: "auto", // Auto width for larger screens
              },
            }}
          >
            {onRetry ? "Go Back" : "Okay"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
