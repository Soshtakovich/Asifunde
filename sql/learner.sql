-- Drop tables if they exist
DROP TABLE IF EXISTS Assessment_Marks;
DROP TABLE IF EXISTS Announcements;
DROP TABLE IF EXISTS Assessments;
DROP TABLE IF EXISTS Enrollment;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Parent;
DROP TABLE IF EXISTS Learner;
DROP TABLE IF EXISTS Learner_Progress;
DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS Content;
DROP TABLE IF EXISTS Sub_Content;


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

-- Insert data into Learner table
INSERT INTO Learner (
    Learner_Number, Surname, Names, ID_Number, Gender, DOB, Age, 
    Location, Address, Email, Cell_number, Whatsapp_number, 
    Picture, Username, Password, Grade, School
) VALUES 
    ('BET25-456123', 'Matsimbe', 'Zakes Samson', '0202186191088', 'Male', '2002-02-18', 22, 
     'Bekkersdal', 'TV 736 Holomisa Section, Bekkersdal, 1779', 'zakessamson1@gmail.com', '0729039172', 
     '0604737475', 'path/to/picture.jpg', 'zex', 'abcd1234', 'Grade 7', 'Simunye Secondary School'),
    ('BET25-852124', 'Mpanza', 'Samson', '1234567890124', 'Female', '2006-02-02', 18, 
     'Simunye', '456 Oak Street', 'bokamosozakesmatsimbe@gmail.com', '0123456788', 
     '0123456788', 'path/to/picture2.jpg', 'samson', 'abcd1234', 'Grade 11', 'Example High School');

-- Insert data into Parent table
INSERT INTO Parent (
    Learner_ID, Surname, Names, Gender, DOB, Email, 
    Cell_number, Whatsapp_number, Relationship, Education, 
    Employment, Address
) VALUES 
    (1, 'Matsimbe', 'Mary', 'Female', '1980-05-05', 'mary.doe@example.com', 
     '0987654321', '0987654321', 'Mother', 'Bachelor', 
     'Engineer', '123 Main St'),
    (2, 'Smith', 'Tom', 'Male', '1975-06-06', 'tom.smith@example.com', 
     '0987654322', '0987654322', 'Father', 'Master', 
     'Manager', '456 Oak St');

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

-- Insert sample subjects
INSERT INTO Subjects (Subject_Name) VALUES
    ('Mathematics'),
    ('Physical Sciences');

-- Insert sample assessments
INSERT INTO Assessments (Subject_ID, Name, Description, File_Link, DueDate, Total_Mark) VALUES
    (1, 'Math Test 1', 'First mathematics test of the year', 'path/to/math_test_1.pdf', '2024-10-01', 100),
    (2, 'Physics Lab Report', 'Lab report on the latest experiment', 'path/to/physics_lab_report.pdf', '2024-10-05', 50);

-- Insert sample announcements
INSERT INTO Announcements (Subject_ID, Date, Content_Heading, Content) VALUES
    (1, '2024-09-20', 'Upcoming Math Test', 'Please prepare for the upcoming math test on 2024-10-01.'),
    (2, '2024-09-21', 'Physics Experiment Reminder', 'Reminder to submit your lab reports by 2024-10-05.');

-- Insert sample enrollments
INSERT INTO Enrollment (Learner_ID, Subject_ID) VALUES
    (1, 1),  -- Zakes is enrolled in Mathematics
    (1, 2),  -- Zakes is also enrolled in Physical Sciences
    (2, 2);  -- Samson is enrolled in Physical Sciences only

-- Insert sample assessment marks
INSERT INTO Assessment_Marks (Assessment_ID, Learner_ID, Mark, Submission_Date) VALUES
    (1, 1, 85, '2024-10-01'),  -- Zakes submits Math Test 1 and scores 85
    (1, 2, 90, '2024-10-01'),  -- Samson submits Math Test 1 and scores 90
    (2, 1, 45, '2024-10-05'),  -- Zakes submits Physics Lab Report and scores 45
    (2, 2, 50, '2024-10-05');  -- Samson submits Physics Lab Report and scores 50


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

INSERT INTO Learner_Progress (
    Learner_ID, Subject_ID, Position_Class, Position_Subject, Attendance_Perc, 
    Average_Mark, Behaviour_Reports, Report_Date, Social_score
) VALUES 
    (1, 1, 2, 1, 95.5, 87.3, 'Excellent participation in class', '2024-09-25',7.65);


CREATE TABLE Attendance (
    Attendance_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_ID INT NOT NULL,
    Subject_ID INT NOT NULL,
    Date DATE NOT NULL,
    Attended BOOLEAN, -- 1 for present, 0 for absent
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID) ON DELETE CASCADE,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);

-- Insert sample attendance data
INSERT INTO Attendance (Learner_ID, Subject_ID, Date, Attended) VALUES
    -- Attendance for Learner 1 (Zakes Samson) in Mathematics
    (1, 1, '2024-09-18', TRUE),
    (1, 1, '2024-09-19', TRUE),
    (1, 1, '2024-09-20', FALSE),
    -- Attendance for Learner 1 in Physical Sciences
    (1, 2, '2024-09-18', TRUE),
    (1, 2, '2024-09-20', TRUE),
    
    -- Attendance for Learner 2 (Samson Mpanza) in Mathematics
    (2, 1, '2024-09-18', TRUE),
    (2, 1, '2024-09-19', TRUE),
    (2, 1, '2024-09-20', TRUE),
    -- Attendance for Learner 2 in Physical Sciences
    (2, 2, '2024-09-18', TRUE),
    (2, 2, '2024-09-20', FALSE);



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


-- Insert sample content
INSERT INTO Content (Subject_ID, Title, Description) VALUES
    (1, 'Algebra', 'Fundamentals of Algebra'),
    (1, 'Patterns', 'Understanding Patterns');

-- Insert sample sub-content with links
INSERT INTO Sub_Content (Content_ID, Sub_Title, Description, Link) VALUES
    (1, 'Factorise', 'Learn how to factor algebraic expressions.', 'path/to/factorise.pdf'),
    (1, 'Solve for x', 'Techniques for solving equations for x.', 'path/to/solve_for_x.pdf'),
    (1, 'Grouping Terms', 'Methods for grouping algebraic terms.', 'path/to/grouping_terms.pdf'),
    (2, 'Pattern Concept', 'Introduction to the concept of patterns.', 'path/to/pattern_concept.pdf'),
    (2, 'Finding the Pattern Rule', 'Steps to find the rule of a pattern.', 'path/to/pattern_rule.pdf'),
    (2, 'General Formula for Patterns', 'Deriving the general formula for patterns.', 'path/to/general_formula.pdf');

