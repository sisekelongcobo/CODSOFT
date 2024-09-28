import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

export const Resume: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Set the selected file
    }
  };

  return (
    <Box sx={{ width: { xs: '100%', sm: '50%', md: '30%', lg: '20%' } }}> {/* Responsive container */}
      <Button variant="outlined" component="label" fullWidth>
        {selectedFile ? 'Change Resume' : 'Upload Resume'}
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={handleFileUpload}
        />
      </Button>

      {/* Show the uploaded file name if available */}
      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Uploaded: {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};
