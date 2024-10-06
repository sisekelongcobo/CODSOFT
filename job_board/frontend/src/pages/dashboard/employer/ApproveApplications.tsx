import { Box, Button, Card, CardContent, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TimeAgo } from "../../../components/TimeAgo";
import { Applicant } from "../../../interface";

export const ApproveApplications: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const rowsPerPage = 5;
  const applicantCount = applicants?.length ?? 0;

  const fetchApplicants = async () => {
    const url = import.meta.env.VITE_API_URL + "/employer/approved-applicants";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error fetching applicants: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if the response is an array
      if (Array.isArray(data)) {
        setApplicants(data);
      } else {
        console.error("Expected array but got:", data);
        setApplicants([]); // Ensure it's an empty array if the data is not what we expect
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]); // Set to empty array in case of error
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = Array.isArray(applicants)
    ? applicants.slice(indexOfFirstRow, indexOfLastRow)
    : [];

  return (
    <>
      {applicantCount === 0 ? (
        <Typography variant="h5" sx={{ marginTop: 4 }}>
          You have no approved applications.
        </Typography>
      ) : (
        <Box sx={{ marginTop: 4 }}>
          {currentRows.map((application) => (
            <Card key={(application.fullName as string) + application.id} sx={{ marginBottom: 2 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h6">
                    {application.jobTitle} - {application.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {application.status}
                  </Typography>
                  <TimeAgo timestamp={application.appliedDate} />
                </Box>

                <Button variant="outlined" color="primary">
                  Schedule Interview
                </Button>
              </CardContent>
            </Card>
          ))}

          <Pagination
            count={Math.ceil(applicants?.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ marginTop: 2, justifyContent: "center", display: "flex" }}
          />
        </Box>
      )}
    </>
  );
};
