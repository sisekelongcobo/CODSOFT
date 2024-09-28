import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingIndicator: React.FC = () => {
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
      <CircularProgress size={60} thickness={5} />
      <Typography variant="h6" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
};
