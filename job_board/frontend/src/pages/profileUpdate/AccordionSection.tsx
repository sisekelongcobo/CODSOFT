import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";

interface SectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  children: React.ReactNode;
}

export const AccordionSection: React.FC<SectionProps> = ({ title, expanded, onChange, children }) => (
  <Accordion expanded={expanded} onChange={onChange}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

