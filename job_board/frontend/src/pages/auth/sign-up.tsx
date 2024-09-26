import { SignUp } from "@clerk/clerk-react";
import "./auth.css";
import { Background } from "./background";

export const SignUpPage: React.FC = () => {
  return (
    <Background>
      <SignUp signInUrl="sign-in" />
    </Background>
  );
};
