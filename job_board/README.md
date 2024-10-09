#Job Board

## Overview

Job Board is a web platform designed to connect employers with potential employees. Employers can post job openings for various positions in their companies, while users (job seekers) can search and apply for these jobs. The application aims to streamline the job search and recruitment process by providing a centralized, easy-to-use interface for both job seekers and employers.

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io/)

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: To add type safety and improve code maintainability.
- **Node.js**: For the backend.
- **pnpm**: Package Manager

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/sisekelongcobo/CODSOFT.git

   ```

2. Navigate to the project directory:

   ```shell
   cd CODSOFT/job_board
   ```

3. Install dependencies:
   ```shell
   pnpm install
   ```

## Configure App

To configure the app, you need to set the following environment variable

### Frontend Environment Variables

- `VITE_API_URL`: The API URL for the backend server.
- `VITE_CLERK_PUBLISHABLE_KEY`: The publishable key for Clerk authentication. (https://clerk.com/docs/quickstarts/react)
- `BLOB_READ_WRITE_TOKEN` : Vercerl read-write blob storage token

### Backend Environment Variables

- `CLERK_SECRET_KEY`: The secret key for Clerk authentication. (https://clerk.com/docs/quickstarts/react)
- `MYSQL_DATABASE`: The name of the MySQL database.
- `MYSQL_HOST`: The host of the MySQL database.
- `MYSQL_PASSWORD`: The password for the MySQL database.
- `MYSQL_PORT`: The port of the MySQL database.
- `MYSQL_USER`: The username for the MySQL database.
- `MY_EMAIL_ADDRESS `: The email address for send out emails.
- `MY_EMAIL_PASSWORD` : The password for the email
- `BLOB_READ_WRITE_TOKEN` : Vercerl read-write blob storage token
- `FRONTEND_URL`: The url for the frontend server.

## Usage

- To start the backend server, run the following command:

  ```shell
  pnpm backend
  ```

- To start the frontend development server, run the following command:
  ```shell
  pnpm frontend
  ```

# Acknowledgments

This project was developed as part of the internship from CODSOFT by Sisekelo Ngcobo
