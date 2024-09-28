import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProfilePicture: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageFile]);

  const handleRemoveImage = () => {
    setImageFile(null);
    setSelectedImage(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Avatar
          src={selectedImage || '/profile-pic-url'}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Button
            variant="outlined"
            component="label"
            sx={{
              mt: 2,
              display: 'block',
              width: { xs: '100vw', sm: '40vw', md: '30vw', lg: '20vw' },
            }}
          >
            {selectedImage ? 'Change Picture' : 'Upload Picture'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {selectedImage && (
            <IconButton
              onClick={handleRemoveImage}
              color="error"
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
              Remove
            </IconButton>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
