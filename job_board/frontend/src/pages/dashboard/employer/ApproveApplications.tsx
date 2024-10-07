import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TimeAgo } from "../../../components/TimeAgo";
import { Applicant } from "../../../interface";

export const ApproveApplications: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [interviewTime, setInterviewTime] = useState<string>("");
  const [error, setError] = useState<{ interviewDate?: string; interviewTime?: string }>({});

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

      if (Array.isArray(data)) {
        setApplicants(data);
      } else {
        console.error("Expected array but got:", data);
        setApplicants([]);
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplicant(null);
    setInterviewDate("");
  };

  const handleScheduleInterview = () => {
    const errors: { interviewDate?: string; interviewTime?: string } = {};

    if (!interviewDate) {
      errors.interviewDate = "Interview date is required";
    }

    if (!interviewTime) {
      errors.interviewTime = "Interview time is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const interviewData = {
      interviewDate,
      interviewTime,
      applicantEmail: selectedApplicant?.applicantEmail,
      jobTitle: selectedApplicant?.jobTitle,
      employerName: selectedApplicant?.company,
      applicantName: selectedApplicant?.applicantName,
    };

    try {
      const url = import.meta.env.VITE_API_URL + "/email/schedule-interview";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(interviewData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error scheduling interview: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Interview scheduled:", data);
          handleCloseModal();
        })
        .catch((error) => console.error("Error scheduling interview:", error));
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
    handleCloseModal();
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
          {currentRows.map((application, index) => (
            <Card
              key={(application.fullName as string) + index.toString() + application.id}
              sx={{ marginBottom: 2 }}
            >
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
                  onClick={() => handleOpenModal(application)}
                >
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

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            width: "50%",
            height: "50%",
          },
        }}
      >
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Schedule an interview for {selectedApplicant?.fullName}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Interview Date"
            type="date"
            fullWidth
            value={interviewDate}
            error={!!error.interviewDate}
            helperText={error.interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Interview Time"
            type="time"
            fullWidth
            value={interviewTime}
            error={!!error.interviewTime}
            helperText={error.interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleScheduleInterview}
            sx={{ color: "white" }}
            variant="contained"
            color="primary"
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
