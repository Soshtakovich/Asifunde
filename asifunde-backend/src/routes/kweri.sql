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
    Grade VARCHAR(10),
    Subject VARCHAR(100),
    Bank_Name VARCHAR(20),
    Branch_Code VARCHAR(10),
    Account_Number VARCHAR(15),
    Account_Type VARCHAR(50),
    Tax_Reference_Number VARCHAR(15)

);


COMMIT;
