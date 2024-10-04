import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import {AccordionSection} from "./AccordionSection";
import { Education } from "./Education";
import { JobPreferences } from "./JobPreferences";
import { Languages } from "./Languages";
import { PersonalInfo } from "./PersonalInfo";
import { Portfolio } from "./Portfolio";
import { ProfessionalSummary } from "./ProfessionalSummary";
import { ProfilePicture } from "./ProfilePicture";
import { Resume } from "./Resume";
import { Skills } from "./Skills";
import { SocialMedia } from "./SocialMedia";
import { WorkExperience } from "./WorkExperience";

export const CandidateProfileUpdate: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  //@ts-ignore
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 2, mb: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Your Profile
        </Typography>
        <Box sx={{ mb: 2 }}>
          <AccordionSection
            title="Personal Information"
            expanded={expanded === "personalInfo"}
            onChange={handleChange("personalInfo")}
          >
            <PersonalInfo />
          </AccordionSection>

          <AccordionSection
            title="Profile Picture"
            expanded={expanded === "profilePicture"}
            onChange={handleChange("profilePicture")}
          >
            <ProfilePicture />
          </AccordionSection>

          <AccordionSection
            title="Resume (CV)"
            expanded={expanded === "resume"}
            onChange={handleChange("resume")}
          >
            <Resume />
          </AccordionSection>

          <AccordionSection
            title="Work Experience"
            expanded={expanded === "workExperience"}
            onChange={handleChange("workExperience")}
          >
            <WorkExperience />
          </AccordionSection>

          <AccordionSection
            title="Education"
            expanded={expanded === "education"}
            onChange={handleChange("education")}
          >
            <Education />
          </AccordionSection>

          <AccordionSection
            title="Skills"
            expanded={expanded === "skills"}
            onChange={handleChange("skills")}
          >
            <Skills />
          </AccordionSection>

          <AccordionSection
            title="Professional Summary"
            expanded={expanded === "professionalSummary"}
            onChange={handleChange("professionalSummary")}
          >
            <ProfessionalSummary />
          </AccordionSection>

          <AccordionSection
            title="Portfolio"
            expanded={expanded === "portfolio"}
            onChange={handleChange("portfolio")}
          >
            <Portfolio />
          </AccordionSection>

          <AccordionSection
            title="Languages"
            expanded={expanded === "languages"}
            onChange={handleChange("languages")}
          >
            <Languages />
          </AccordionSection>

          <AccordionSection
            title="Social Media"
            expanded={expanded === "socialMedia"}
            onChange={handleChange("socialMedia")}
          >
            <SocialMedia />
          </AccordionSection>

          <AccordionSection
            title="Job Preferences"
            expanded={expanded === "jobPreferences"}
            onChange={handleChange("jobPreferences")}
          >
            <JobPreferences />
          </AccordionSection>
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3, color: "white", width: "100%" }}
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};
