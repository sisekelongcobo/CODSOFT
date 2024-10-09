import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchText);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <TextField
        label="Search for jobs..."
        variant="outlined"
        value={searchText}
        onChange={handleInputChange}
        sx={{ width: "60%", boxShadow: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 2, py: 1.5, px: 4, color: "white" }}
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </Box>
  );
};
