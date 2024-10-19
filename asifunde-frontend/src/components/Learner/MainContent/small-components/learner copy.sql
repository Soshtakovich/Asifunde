

-- Create Learner Table
CREATE TABLE Learner (
    Learner_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_Number VARCHAR(20) NOT NULL UNIQUE,
    Surname VARCHAR(50) NOT NULL,
    Names VARCHAR(50) NOT NULL,
    ID_Number VARCHAR(20) NOT NULL UNIQUE,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    DOB DATE NOT NULL,
    Age INT NOT NULL,
    Location VARCHAR(100),
    Address VARCHAR(255),
    Email VARCHAR(100) NOT NULL UNIQUE,
    Cell_number VARCHAR(15),
    Whatsapp_number VARCHAR(15),
    Picture VARCHAR(255),
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Grade VARCHAR(10),
    School VARCHAR(100)
);

-- Create Parent Table
CREATE TABLE Parent (
    Parent_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_ID INT NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Names VARCHAR(50) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    DOB DATE NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Cell_number VARCHAR(15),
    Whatsapp_number VARCHAR(15),
    Relationship VARCHAR(50),
    Education VARCHAR(100),
    Employment VARCHAR(100),
    Address VARCHAR(255),
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID) ON DELETE CASCADE
);



-- Create Subjects Table
CREATE TABLE Subjects (
    Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_Name VARCHAR(100) NOT NULL UNIQUE
);

-- Create Enrollment Table
CREATE TABLE Enrollment (
    Enrollment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_ID INT NOT NULL,
    Subject_ID INT NOT NULL,
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID) ON DELETE CASCADE,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE,
    UNIQUE (Learner_ID, Subject_ID) -- Ensure each learner can enroll in a subject only once
);

-- Create Assessments Table
CREATE TABLE Assessments (
    Assessment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_ID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    File_Link VARCHAR(255), -- Store PDF file link or other links
    DueDate DATE NOT NULL,
    Total_Mark INT NOT NULL,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);

-- Create Announcements Table
CREATE TABLE Announcements (
    Announcement_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_ID INT NOT NULL,
    Date DATE NOT NULL,
    Content_Heading TEXT NOT NULL,
    Content TEXT NOT NULL,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);

-- Create Assessment_Marks Table
CREATE TABLE Assessment_Marks (
    Mark_ID INT AUTO_INCREMENT PRIMARY KEY,
    Assessment_ID INT NOT NULL,
    Learner_ID INT NOT NULL,
    Mark INT NOT NULL,
    Submission_Date DATE, -- New column for submission date
    FOREIGN KEY (Assessment_ID) REFERENCES Assessments(Assessment_ID) ON DELETE CASCADE,
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID) ON DELETE CASCADE,
    UNIQUE (Assessment_ID, Learner_ID) -- Ensure each learner has only one mark per assessment
);



CREATE TABLE Learner_Progress (
    Progress_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_ID INT NOT NULL,
    Subject_ID INT, -- Nullable if tracking overall progress (in all subjects), not just a single subject
    Position_Class INT, -- Position in the entire class (optional if just subject position is needed)
    Position_Subject INT, -- Position in a particular subject
    Attendance_Perc FLOAT, -- Attendance as a percentage
    Average_Mark FLOAT, -- Average mark for the learner
    Behaviour_Reports TEXT, -- Details of behavior reports (could store as JSON or just free text)
    Report_Date DATE, -- Date of the behavior report
    Social_score FLOAT,
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID) ON DELETE CASCADE,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);



CREATE TABLE Attendance (
    Attendance_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_ID INT NOT NULL,
    Subject_ID INT NOT NULL,
    Date DATE NOT NULL,
    Attended BOOLEAN, -- 1 for present, 0 for absent
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID) ON DELETE CASCADE,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);



-- Create Content Table
CREATE TABLE Content (
    Content_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_ID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);

-- Create Sub_Content Table with Link
CREATE TABLE Sub_Content (
    Sub_Content_ID INT AUTO_INCREMENT PRIMARY KEY,
    Content_ID INT NOT NULL,
    Sub_Title VARCHAR(100) NOT NULL,
    Description TEXT,
    Link VARCHAR(255),  -- Path to the file or URL
    FOREIGN KEY (Content_ID) REFERENCES Content(Content_ID) ON DELETE CASCADE
);

