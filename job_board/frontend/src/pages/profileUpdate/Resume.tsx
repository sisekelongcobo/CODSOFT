import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

export const Resume: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Box sx={{ width: { xs: "100%", sm: "50%", md: "30%", lg: "20%" } }}>
      {" "}
      <Button variant="outlined" component="label" fullWidth>
        {selectedFile ? "Change Resume" : "Upload Resume"}
        <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
      </Button>
      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Uploaded: {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};
