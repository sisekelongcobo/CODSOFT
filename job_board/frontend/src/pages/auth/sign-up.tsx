import { SignUp } from "@clerk/clerk-react";
import "./auth.css";
import { Box } from "@mui/material";

export const SignUpPage: React.FC = () => {
  return (
    <Box style={{ position: "relative", height: "100vh", overflow: "hidden" }} >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/v1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <SignUp signInUrl="/sign-up" />
      </Box>
    </Box> 
  );
};
