import { useAuth } from "@clerk/clerk-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/auth/sign-in";
import { SignUpPage } from "./pages/auth/sign-up";
import { HomePage } from "./pages/home/HomePage";
import { JobListingsPage } from "./pages/job-listing/JobListingsPage";
import { Layout } from "./components/Layout";
import { JobDetailPage } from "./pages/job-listing/JobDetails";
import {EmployerDashboard}  from "./pages/dashboard/EmployerDashboard";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage/>} />

          {isSignedIn && 
            <>
              <Route path="/job-listings" element={<JobListingsPage/>} />
              <Route path="/job-details" element={<JobDetailPage/>} />
              <Route path="/employer-dashboard" element={<EmployerDashboard/>} />
            </>
          }

          <Route
            path="/"
            element={
              isSignedIn ? <Navigate to={"/home"} /> : <Navigate to={"/sign-in"} />
            }
          />
          <Route path="*" element={<>No Route Found</>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;