# 🌆 Urban Sync – Government Service Issue Logging App

## Overview  
Urban Sync is a government-focused platform designed for citizens to log municipal service delivery issues. Beyond its civic utility, this app serves as a personal project to strengthen understanding of **data structures** by implementing custom logic in the backend.

When users submit issue lists, the backend temporarily stores them in a **custom list structure** before persisting them to an **Azure SQL database**, demonstrating real-world use of algorithmic thinking.

## Tech Stack  
- **Backend:** ASP.NET Core with Minimal APIs  
- **Frontend:** React + Chakra UI  
- **Database:** Azure SQL (cloud-hosted)  
- **Containerization:** Docker (Docker Desktop required for local development)  
- **Project Setup:** Unified .NET solution bundling both frontend and backend  

## Features (Part 1)  
- Users can submit and view lists of municipal issues  
- Backend uses custom data structures for temporary data handling  
- Frontend restricts access to future features (Parts 2 & 3)  
- Login required; unauthenticated users are redirected to the login screen  

## Setup Instructions  
1. Install **Docker Desktop**  
2. Open the solution in **Visual Studio**  
3. Configure startup projects:  
   - Click **Configure Startup Projects** near the debug button  
   - Select **Multiple Startup Projects**  
   - Set both **server** and **client** to **Start**  
4. Start debugging—both frontend and backend will launch together  

## Notes  
- Chakra UI powers a clean, responsive frontend  
- Backend showcases custom data structures in action  
- Features from Part 2 and Part 3 are currently disabled  

## Demo Credentials  
Use the following credentials to log in and explore Urban Sync:  
*(Insert credentials here)*
