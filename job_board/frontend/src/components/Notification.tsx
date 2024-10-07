import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";

interface NotificationProps {
  showNotification: boolean;
  handleCloseNotification: () => void;
  isRejected?: boolean;
  message?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  showNotification,
  handleCloseNotification,
  isRejected,
  message,
}) => {
  return (
    <Snackbar
      open={showNotification}
      autoHideDuration={2000}
      onClose={handleCloseNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {isRejected ? (
        <MuiAlert onClose={handleCloseNotification} severity="error" elevation={6} variant="filled">
          Operation Failed
        </MuiAlert>
      ) : (
        <MuiAlert
          onClose={handleCloseNotification}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {message}
        </MuiAlert>
      )}
    </Snackbar>
  );
};
