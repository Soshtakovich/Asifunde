START TRANSACTION;

-- Create Teacher Table
CREATE TABLE Teacher (
    Teacher_ID INT AUTO_INCREMENT PRIMARY KEY,
    Teacher_Number VARCHAR(20) NOT NULL UNIQUE,  
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
    Bank_Name VARCHAR(20),
    Branch_Code VARCHAR(10),
    Account_Number VARCHAR(15),
    Account_Type VARCHAR(50),
    Tax_Reference_Number VARCHAR(15),
    Date_Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Grade Table (Assumes Grade is VARCHAR and can be 10, 11, 12, etc.)
CREATE TABLE Grades (
    Grade_ID INT AUTO_INCREMENT PRIMARY KEY,
    Grade_Name VARCHAR(10) NOT NULL UNIQUE
);

-- Create Teacher_Grades Table (Associating Teachers with Grades)
CREATE TABLE Teacher_Grades (
    Teacher_Grade_ID INT AUTO_INCREMENT PRIMARY KEY,
    Teacher_ID INT,
    Grade_ID INT,
    FOREIGN KEY (Teacher_ID) REFERENCES Teacher(Teacher_ID) ON DELETE CASCADE,
    FOREIGN KEY (Grade_ID) REFERENCES Grades(Grade_ID) ON DELETE CASCADE
);

-- Create Teacher_Subjects Table (Associating Teachers with Subjects)
CREATE TABLE Teacher_Subjects (
    Teacher_Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
    Teacher_ID INT,
    Subject_ID INT,
    FOREIGN KEY (Teacher_ID) REFERENCES Teacher(Teacher_ID) ON DELETE CASCADE,
    FOREIGN KEY (Subject_ID) REFERENCES Subjects(Subject_ID) ON DELETE CASCADE
);

-- Insert Grades (Grade 10, 11, 12)
INSERT INTO Grades (Grade_Name) VALUES ('10'), ('11'), ('12');

-- Insert Teachers
INSERT INTO Teacher (Teacher_Number, Surname, Names, ID_Number, Gender, DOB, Age, Location, Address, Email, Cell_number, Whatsapp_number, Username, Password, Bank_Name, Branch_Code, Account_Number, Account_Type, Tax_Reference_Number)
VALUES 
('TBET-0001', 'Smith', 'John', '9001011234080', 'Male', '1990-01-01', 34, 'Location1', 'Address1', 'john.smith@example.com', '0712345678', '0712345678', 'john_smith', 'password123', 'Bank1', '1234', '123456789', 'Savings', '123456789'),
('TBET-0002', 'Doe', 'Jane', '9203011234080', 'Female', '1992-03-01', 32, 'Location2', 'Address2', 'jane.doe@example.com', '0823456789', '0823456789', 'jane_doe', 'password123', 'Bank2', '5678', '987654321', 'Cheque', '987654321'),
('TBET-0003', 'Mokoena', 'Thabo', '9105011234080', 'Male', '1991-05-01', 33, 'Location3', 'Address3', 'thabo.mokoena@example.com', '0734567890', '0734567890', 'thabo_mokoena', 'password123', 'Bank3', '9101', '567890123', 'Savings', '567890123'),
('TBET-0004', 'Nkosi', 'Lerato', '8807011234080', 'Female', '1988-07-01', 36, 'Location4', 'Address4', 'lerato.nkosi@example.com', '0745678901', '0745678901', 'lerato_nkosi', 'password123', 'Bank4', '1111', '345678901', 'Cheque', '345678901'),
('TBET-0005', 'van der Merwe', 'Pieter', '8502011234080', 'Male', '1985-02-01', 39, 'Location5', 'Address5', 'pieter.vdm@example.com', '0756789012', '0756789012', 'pieter_vdm', 'password123', 'Bank5', '2222', '234567890', 'Savings', '234567890'),
('TBET-0006', 'Gumede', 'Sihle', '9408011234080', 'Other', '1994-08-01', 30, 'Location6', 'Address6', 'sihle.gumede@example.com', '0767890123', '0767890123', 'sihle_gumede', 'password123', 'Bank6', '3333', '345678912', 'Cheque', '345678912'),
('TBET-0007', 'Mbatha', 'Zodwa', '9204011234080', 'Female', '1992-04-01', 32, 'Location7', 'Address7', 'zodwa.mbatha@example.com', '0723456789', '0723456789', 'zodwa_mbatha', 'password123', 'Bank7', '4444', '456789123', 'Savings', '456789123');

-- Associate Teachers with Grades
INSERT INTO Teacher_Grades (Teacher_ID, Grade_ID) VALUES
(1, 3),  -- Teacher 1 teaches Grade 12
(2, 3),  -- Teacher 2 teaches Grade 12
(3, 2),  -- Teacher 3 teaches Grade 11
(4, 2),  -- Teacher 4 teaches Grade 11
(5, 1),  -- Teacher 5 teaches Grade 10
(6, 1),  -- Teacher 6 teaches Grade 10
(6, 2),  -- Teacher 6 also teaches Grade 11
(7, 1),  -- Teacher 7 teaches Grade 10
(7, 2);  -- Teacher 7 also teaches Grade 11

-- Associate Teachers with Subjects
INSERT INTO Teacher_Subjects (Teacher_ID, Subject_ID) VALUES
(1, 1),  -- Teacher 1 teaches Mathematics (Subject 1)
(2, 2),  -- Teacher 2 teaches Physical Sciences (Subject 2)
(3, 1),  -- Teacher 3 teaches Mathematics (Subject 1)
(4, 2),  -- Teacher 4 teaches Physical Sciences (Subject 2)
(5, 1),  -- Teacher 5 teaches Mathematics (Subject 1)
(6, 2),  -- Teacher 6 teaches Physical Sciences (Subject 2)
(6, 1),  -- Teacher 6 also teaches Mathematics (Subject 1) in Grade 11
(7, 3),  -- Teacher 7 teaches Mathematics (Subject 3) in Grade 10
(7, 1);  -- Teacher 7 teaches Mathematics (Subject 1) in Grade 11

-- End of script
