import { Box, Button, Card, CardContent, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../../../components/TimeAgo";
import { Applicant } from "../../../interface";

export const PendingApplications: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const rowsPerPage = 5;

  const fetchApplicants = async () => {
    const url = import.meta.env.VITE_API_URL + "/employer/applicants";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
      })
      .catch((error) => console.error("Error fetching applicants:", error));
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
  const currentRows = applicants?.slice(indexOfFirstRow, indexOfLastRow);
  const navigate = useNavigate();

  return (
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

            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/applicant-details`)}
            >
              View Application
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
  );
};
