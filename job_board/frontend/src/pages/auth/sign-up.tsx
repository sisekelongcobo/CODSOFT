import { SignUp } from "@clerk/clerk-react";
import "./auth.css";

export const SignUpPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};
