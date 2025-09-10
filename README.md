# Government Service Issue Logging App

## Overview
This application is a government-based platform designed for users to log municipal issues related to service delivery. Beyond its practical use, this app serves as a personal project to test and strengthen knowledge of **data structures** by implementing custom data structures in the backend.

Currently, the backend uses a **custom list** to manage data before persisting it to the database. When a user submits a list of items, the backend holds these items temporarily in the custom data structure and subsequently populates the **Azure SQL database** with them.

## Tech Stack
- **Backend:** ASP.NET Core using **Minimal APIs**  
- **Frontend:** React with **Chakra UI** for UI components  
- **Database:** Azure SQL (hosted)  
- **Containerization:** Docker (Docker Desktop required for local development)  
- **Project Setup:** React and ASP.NET Core bundled together in a **.NET solution**

## Features (Part 1)
- Users can submit and view lists of municipal issues.
- Custom data structures handle data management in the backend before database persistence.
- Frontend restricts access to features planned for Parts 2 and 3.
- Login is required to interact with the system; unauthenticated users are redirected to the login screen.

## Setup Instructions
1. **Install Docker Desktop** on your system.
2. Open the solution in **Visual Studio**.
3. Configure startup projects:
   - Click **Configure Startup Projects** at the top (near the debug button).
   - Select **Multiple Startup Projects**.
   - Set both the **server** and **client** to **Start**.
4. Start debugging; both frontend and backend will run together.

## Notes
- The frontend is built with Chakra UI for a simple and responsive interface.
- The backend demonstrates the use of **custom data structures** in real-world scenarios.
- Part 2 and Part 3 features are currently disabled in the frontend.

## Demo Credentials
You can use the following credentials to log in and explore the app:
