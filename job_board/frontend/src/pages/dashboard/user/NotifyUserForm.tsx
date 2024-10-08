import React, { useState } from "react";

export const NotifyUserForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/email/notify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
      } else {
        setResponseMessage("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error sending email");
    }
  };

  return (
    <div>
      <h2>Notify User of Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Notification</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};
