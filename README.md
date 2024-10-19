Asifunde Application
Overview
The Asifunde Application is an education management platform that provides tools for learners, teachers, and administrators to manage academic resources and assessments efficiently. The project is divided into frontend and backend parts, with a separate directory for handling learner applications.

Directory Structure
Copy code
Asifunde-online-applications/
README.md
asifunde-backend/
asifunde-frontend/
1. Asifunde-online-applications/
This directory handles the learner application process. It includes:

Application Form: Where learners apply for various grades (e.g., Grades 10, 11, 12).
PHP Scripts: For processing applications, sending acknowledgment and offer emails to learners, and handling the creation of learner accounts upon acceptance.
Database Connections: It connects to the asifunde_applications database, stores application details, and later interacts with the main database (asifunde_db) during the enrollment phase.
Key Functionalities:
Learner Application: Learners can submit their application for review.
Offer Management: Emails are sent to learners offering them a spot, which they can accept or decline.
Enrollment Process: Once the offer is accepted, learner details are moved to the asifunde_db, and a unique Learner_Number is generated. The learner is also enrolled in default subjects (Mathematics and Physical Sciences).
2. README.md
This file provides an overview and explanation of the directory structure and functionality of the Asifunde app. It guides users on how to get started and understand the different components of the project.

3. asifunde-backend/
This directory contains the Node.js backend of the application. It manages the server-side logic for:

Session Management: Handles user authentication and session tracking based on Learner_Number for logged-in learners.
Data Processing: Processes and manages data for learners, teachers, and administrators. It connects to the asifunde_db for storing and retrieving course materials, assessments, and user progress.
APIs: Provides APIs for frontend communication, managing user data, assessments, and announcements.
Key Features:
User Authentication: Ensures only authorized users can access the platform.
Course & Assessment Management: Teachers can create courses, assign assessments, and track learner progress.
Progress Tracking: Admins can monitor the progress of both learners and teachers through analytics tools.
4. asifunde-frontend/
This directory hosts the React-based frontend of the application, offering the user interface (UI) for learners, teachers, and administrators. It connects with the backend to display data and manage interactions.

Key Components:
Learner Dashboard: Learners can view their enrolled courses, submit assessments, and see announcements.
Teacher Dashboard: Teachers can create assessments, view learner submissions, and manage course materials.
Admin Dashboard: Admins can manage learners, teachers, track progress, and oversee the overall system.
Key Features:
Real-time Interaction: Users can see announcements, submit homework, and receive updates from teachers.
UI Components: Dynamic forms, dashboards, progress charts, and file uploads for assessments.
How to Run
Backend
Navigate to the asifunde-backend/ directory:

bash
Copy code
cd asifunde-backend
npm install
npm start
This starts the Node.js backend server, ensuring that all the required packages are installed and the backend is running on the specified port.

Frontend
Navigate to the asifunde-frontend/ directory:

bash
Copy code
cd asifunde-frontend
npm install
npm start
This will launch the React frontend. The frontend communicates with the backend through the provided APIs to manage user data and display relevant information.

Applications
To handle applications, ensure that the Asifunde-online-applications/ directory is properly set up and configured with the correct database details.

Database
Application Database: asifunde_applications - stores learner application data.
Main Database: asifunde_db - stores user data (learners, teachers, admins), course data, assessments, learner progress, and more.