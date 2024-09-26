import { SignIn } from "@clerk/clerk-react";
import "./auth.css";
import { Background } from "./background";

export const SignInPage: React.FC = () => {
  return (
    <Background>
      <SignIn signUpUrl="/sign-up" />
    </Background>
  );
};
