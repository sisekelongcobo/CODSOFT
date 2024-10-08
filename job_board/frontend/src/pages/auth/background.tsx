import { Box, useMediaQuery } from "@mui/material";
import { theme } from "../../theme";

export const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {isMobile ? (
        <img
          src="/banner.jpg"
          alt="Fallback background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      ) : (
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
        </video>
      )}

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
