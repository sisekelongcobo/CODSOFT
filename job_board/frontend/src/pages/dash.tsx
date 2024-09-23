import { SignOutButton } from "@clerk/clerk-react";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton />
    </div>
  );
};

export default Dashboard;