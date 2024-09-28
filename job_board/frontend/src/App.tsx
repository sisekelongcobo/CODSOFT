import { useAuth } from "@clerk/clerk-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { Unauthenticated } from "./components/Unauthenticated";
import { SignInPage } from "./pages/auth/sign-in";
import { SignUpPage } from "./pages/auth/sign-up";
import { CandidateDashboard } from "./pages/dashboard/user/UserDashboard";
import { HomePage } from "./pages/home/HomePage";
import { JobDetailPage } from "./pages/job-listing/JobDetails";
import { JobListingsPage } from "./pages/job-listing/JobListingsPage";
import { CandidateProfileUpdate } from "./pages/profileUpdate/CandidateProfileUpdate";
import { NewJobForm } from "./pages/dashboard/employer/NewJobForm";
import { EmployerDashboard } from "./pages/dashboard/employer/EmployerDashboard";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new-job" element={<NewJobForm />} />

          {isSignedIn ? (
            <>
              <Route path="/job-listings" element={<JobListingsPage />} />
              <Route path="/job-details" element={<JobDetailPage />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
              <Route path="/update-profile" element={<CandidateProfileUpdate />} />
              <Route path="*" element={<>No Route Found</>} />
            </>
          ) : (
            <Route path="*" element={<Unauthenticated />} />
          )}

          <Route path="/" element={<Navigate to={"/home"} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
