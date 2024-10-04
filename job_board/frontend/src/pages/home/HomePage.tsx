import { Box, Button, Container, Dialog, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import React, { useRef } from "react";
import { FeaturedJobs } from "./FeaturedJobs";
import { NewJobs } from "./NewJobs";
import { NewJobForm } from "../dashboard/employer/NewJobForm";
import theme from "../../theme";

export const HomePage: React.FC = () => {
  const featuredJobsRef = useRef<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleExploreClick = () => {
    if (featuredJobsRef.current) {
      featuredJobsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: 'url("/path-to-banner-image.jpg")',
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          backgroundPosition: "center",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: -1, // Push the video behind the content
          }}
        >
          <source src="/v1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
        <Box sx={{ zIndex: 2 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Find Your Dream Job
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4, py: 1.5, px: 4, color: "white" }}
            onClick={handleExploreClick}
          >
            Explore Jobs
          </Button>
        </Box>
      </Box>

      <Container ref={featuredJobsRef} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          Featured Jobs
        </Typography>
        <FeaturedJobs />
      </Container>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          New Jobs
        </Typography>
        <NewJobs />
      </Container>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4}>
          {["Wide Range of Jobs", "Easy to Apply", "Post Jobs in Minutes"].map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{height: isMediumScreen ? "10rem" : "12rem" ,p: 4, textAlign: "center", backgroundColor: "#fafafa" }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {benefit}
                </Typography>
                <Typography>
                  {benefit === "Wide Range of Jobs"
                    ? "We offer a diverse range of job listings across various industries and locations."
                    : benefit === "Easy to Apply"
                      ? "Apply to jobs quickly and easily with our streamlined application process."
                      : "Employers can post job openings in just a few simple steps, making it easier to find the right candidates."}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: "#f5f5f5", py: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Are you an Employer?
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Post your job openings and find the best candidates today.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, color: "white" }}
          onClick={handleOpenModal}
        >
          Post a Job Now
        </Button>
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        {/* @ts-ignore */}
        <NewJobForm handleClose={handleCloseModal} />
      </Dialog>
      </Box>
    </>
  );
};
