import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Pagination } from '@mui/material';

const mockApplications = [
  { id: 1, job: 'Software Engineer', applicant: 'John Doe', status: 'Pending' },
  { id: 2, job: 'Product Manager', applicant: 'Jane Smith', status: 'Accepted' },
  { id: 3, job: 'UI/UX Designer', applicant: 'Alice Johnson', status: 'Rejected' },
  { id: 4, job: 'Software Engineer', applicant: 'John Doe', status: 'Pending' },
  { id: 5, job: 'Product Manager', applicant: 'Jane Smith', status: 'Accepted' },
  { id: 6, job: 'UI/UX Designer', applicant: 'Alice Johnson', status: 'Rejected' },
  { id: 7, job: 'Software Engineer', applicant: 'John Doe', status: 'Pending' },
  { id: 8, job: 'Product Manager', applicant: 'Jane Smith', status: 'Accepted' },
  { id: 9, job: 'UI/UX Designer', applicant: 'Alice Johnson', status: 'Rejected' },
];

export const PendingApplications: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = mockApplications.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Box sx={{ marginTop: 4 }}>
      {currentRows.map((application) => (
        <Card key={application.id} sx={{ marginBottom: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6">
                {application.job} - {application.applicant}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {application.status}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => alert(`Viewing application status for ${application.applicant}`)}
            >
              View Application
            </Button>
          </CardContent>
        </Card>
      ))}

      <Pagination
        count={Math.ceil(mockApplications.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 2, justifyContent: 'center', display: 'flex' }}
      />
    </Box>
  );
};
