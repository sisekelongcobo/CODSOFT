import { useAuth } from "@clerk/clerk-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import Dashboard from "./pages/dash";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {isSignedIn && <Route path="/dashboard" element={<Dashboard/>} />}

        <Route
          path="/"
          element={
            isSignedIn ? <Navigate to={"/dashboard"} /> : <Navigate to={"/sign-in"} />
          }
        />
        <Route path="*" element={<>No Route Found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;