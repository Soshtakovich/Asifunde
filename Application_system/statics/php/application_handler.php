<?php
// Enable error reporting for development (remove this in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the database connection
include 'db_connect.php'; // Assuming this file contains the database connection code

// Try to create the Learner table
$create_learner_table = "
CREATE TABLE IF NOT EXISTS Learner (
    Learner_ID INT AUTO_INCREMENT PRIMARY KEY,
    Surname VARCHAR(255) NOT NULL,
    Names VARCHAR(255) NOT NULL,
    ID_Number VARCHAR(13) NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    DOB DATE NOT NULL,
    Age INT NOT NULL,
    Location VARCHAR(255),
    Address VARCHAR(255),
    Email VARCHAR(255) NOT NULL,
    Cell_number VARCHAR(15),
    Whatsapp_number VARCHAR(15),
    Grade VARCHAR(10) NOT NULL,
    School VARCHAR(255),
    Application_Reference VARCHAR(20) NOT NULL,
    Application_Status VARCHAR(20) NOT NULL DEFAULT 'Pending'
)";
if (!$conn->query($create_learner_table)) {
    die("Error creating Learner table: " . $conn->error);
}

// Try to create the Parent table
$create_parent_table = "
CREATE TABLE IF NOT EXISTS Parent (
    Parent_ID INT AUTO_INCREMENT PRIMARY KEY,
    Learner_ID INT NOT NULL,
    Surname VARCHAR(255) NOT NULL,
    Names VARCHAR(255) NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    DOB DATE NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Cell_number VARCHAR(15),
    Whatsapp_number VARCHAR(15),
    Relationship VARCHAR(50),
    Education VARCHAR(255),
    Employment VARCHAR(255),
    Address VARCHAR(255),
    FOREIGN KEY (Learner_ID) REFERENCES Learner(Learner_ID)
)";
if (!$conn->query($create_parent_table)) {
    die("Error creating Parent table: " . $conn->error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Sanitize and retrieve learner data
        $surname = $conn->real_escape_string($_POST['surname']);
        $names = $conn->real_escape_string($_POST['names']);
        $id_number = $conn->real_escape_string($_POST['id_number']);
        $gender = $conn->real_escape_string($_POST['gender']);
        $dob = $conn->real_escape_string($_POST['dob']);
        $age = $conn->real_escape_string($_POST['age']);
        $location = $conn->real_escape_string($_POST['location']);
        $address = $conn->real_escape_string($_POST['address']);
        $email = $conn->real_escape_string($_POST['email']);
        $cell_number = $conn->real_escape_string($_POST['cell_number']);
        $whatsapp_number = $conn->real_escape_string($_POST['whatsapp_number']);
        $grade = $conn->real_escape_string($_POST['grade']);
        $school = $conn->real_escape_string($_POST['school']);

        // Sanitize and retrieve parent data
        $parent_surname = $conn->real_escape_string($_POST['parent_surname']);
        $parent_names = $conn->real_escape_string($_POST['parent_names']);
        $parent_gender = $conn->real_escape_string($_POST['parent_gender']);
        $parent_dob = $conn->real_escape_string($_POST['parent_dob']);
        $parent_email = $conn->real_escape_string($_POST['parent_email']);
        $parent_cell_number = $conn->real_escape_string($_POST['parent_cell_number']);
        $parent_whatsapp_number = $conn->real_escape_string($_POST['parent_whatsapp_number']);
        $relationship = $conn->real_escape_string($_POST['relationship']);
        $education = $conn->real_escape_string($_POST['education']);
        $employment = $conn->real_escape_string($_POST['employment']);
        $parent_address = $conn->real_escape_string($_POST['parent_address']);

        // Create application reference
        $application_reference = 'APPL-25-' . str_pad(rand(0, 9999999), 7, '0', STR_PAD_LEFT);
        $application_status = "Pending";

        // Insert learner data
        $learner_query = "INSERT INTO Learner (Surname, Names, ID_Number, Gender, DOB, Age, Location, Address, Email, Cell_number, Whatsapp_number, Grade, School, Application_Reference, Application_Status) 
                          VALUES ('$surname', '$names', '$id_number', '$gender', '$dob', '$age', '$location', '$address', '$email', '$cell_number', '$whatsapp_number', '$grade', '$school', '$application_reference', '$application_status')";

        if ($conn->query($learner_query) === TRUE) {
            $learner_id = $conn->insert_id;

            // Insert parent data
            $parent_query = "INSERT INTO Parent (Learner_ID, Surname, Names, Gender, DOB, Email, Cell_number, Whatsapp_number, Relationship, Education, Employment, Address) 
                             VALUES ('$learner_id', '$parent_surname', '$parent_names', '$parent_gender', '$parent_dob', '$parent_email', '$parent_cell_number', '$parent_whatsapp_number', '$relationship', '$education', '$employment', '$parent_address')";

            if ($conn->query($parent_query) === TRUE) {
                // Sending email using PHP's mail function
                $to = $email;
                $subject = 'Asifunde Application Acknowledgment';
                $message = "Dear $names,<br><br>Thank you for submitting your application to Asifunde. 
                            Your application reference number is <strong>$application_reference</strong>. 
                            We will process your application and update you on its status soon.<br><br>
                            Regards,<br>Asifunde Team";
                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                $headers .= "From: applications@zakesmatsimbe.net.za" . "\r\n";

                if(mail($to, $subject, $message, $headers)) {
                        // Wait 3 seconds and send the offer email
                        sleep(3);
                        // Send offer email
                        include 'send_offer.php';
                } else {
                   // echo "Application submitted successfully, but the email could not be sent.";
                }
            } else {
                throw new Exception("Error inserting parent data: " . $conn->error);
            }
        } else {
            throw new Exception("Error inserting learner data: " . $conn->error);
        }
    } catch (Exception $e) {
        echo "Failed to submit the application: " . $e->getMessage();
    }

    // Close the connection
    $conn->close();
}
?>
