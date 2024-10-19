<?php
include 'asifunde_db_connect.php';

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the learner data is passed
if (isset($_GET['Surname'])) {
    // Sanitize input data
    $surname = $asifunde_conn->real_escape_string($_GET['Surname']);
    $names = $asifunde_conn->real_escape_string($_GET['Names']);
    $id_number = $asifunde_conn->real_escape_string($_GET['ID_Number']);
    $gender = $asifunde_conn->real_escape_string($_GET['Gender']);
    $dob = $asifunde_conn->real_escape_string($_GET['DOB']);
    $age = $asifunde_conn->real_escape_string($_GET['Age']);
    $location = $asifunde_conn->real_escape_string($_GET['Location']);
    $address = $asifunde_conn->real_escape_string($_GET['Address']);
    $email = $asifunde_conn->real_escape_string($_GET['Email']);
    $cell_number = $asifunde_conn->real_escape_string($_GET['Cell_number']);
    $whatsapp_number = $asifunde_conn->real_escape_string($_GET['Whatsapp_number']);
    $grade = $asifunde_conn->real_escape_string($_GET['Grade']);
    $school = $asifunde_conn->real_escape_string($_GET['School']);

    // Check if the learner is already enrolled based on ID_Number
    $check_enrollment_query = "SELECT * FROM Learner WHERE ID_Number = '$id_number'";
    $result = $asifunde_conn->query($check_enrollment_query);

    if ($result->num_rows > 0) {
        // Learner is already enrolled
        echo "The learner has already accepted the offer and is enrolled.<br>";
    } else {
        // Learner is not enrolled, proceed with enrollment

        // Generate Learner_Number
        $learner_number = 'BET-' . str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $username = strtolower(substr($names, 0, 3) . substr($surname, 0, 3) . rand(100, 999));

        // Hash the password using bcrypt
       // $raw_password = substr(md5(uniqid()), 0, 8); // Random password generation
        $raw_password = bin2hex(random_bytes(4));
        $password = password_hash($raw_password, PASSWORD_BCRYPT); // Hash the password using bcrypt

        // Prepare and execute the insert query for the learner
        $insert_learner = "INSERT INTO Learner (Learner_Number, Surname, Names, ID_Number, Gender, DOB, Age, Location, Address, Email, Cell_number, Whatsapp_number, Grade, School, Username, Password) 
                           VALUES ('$learner_number', '$surname', '$names', '$id_number', '$gender', '$dob', '$age', '$location', '$address', '$email', '$cell_number', '$whatsapp_number', '$grade', '$school', '$username', '$password')";

        if ($asifunde_conn->query($insert_learner) === TRUE) {
            $new_learner_id = $asifunde_conn->insert_id;

            // Enroll in subjects (Mathematics = 1, Physical Sciences = 2)
            $subject_ids = [1, 2]; // Assuming these IDs correspond to the subjects in your Enrollment table
            foreach ($subject_ids as $subject_id) {
                $enroll_query = "INSERT INTO Enrollment (Learner_ID, Subject_ID) VALUES ('$new_learner_id', '$subject_id')";
                if (!$asifunde_conn->query($enroll_query)) {
                    echo "Error enrolling learner in subject $subject_id: " . $asifunde_conn->error . "<br>";
                }

                // Insert random progress data for each subject
                $position_class = rand(1, 50); // Random position in class
                $position_subject = rand(1, 30); // Random position in subject
                $attendance_perc = rand(70, 100); // Random attendance percentage
                $average_mark = rand(50, 100); // Random average mark
                $social_score = round(rand(0, 10) + rand(0, 100) / 100, 2); // Random social score between 0 and 10
                $report_date = date('Y-m-d'); // Current date
                $behaviour_reports = "Good progress"; // Static behavior report for now

                // Insert into Learner_Progress table
                $insert_progress = "INSERT INTO Learner_Progress (Learner_ID, Subject_ID, Position_Class, Position_Subject, Attendance_Perc, Average_Mark, Behaviour_Reports, Report_Date, Social_score) 
                                    VALUES ('$new_learner_id', '$subject_id', '$position_class', '$position_subject', '$attendance_perc', '$average_mark', '$behaviour_reports', '$report_date', '$social_score')";

                if (!$asifunde_conn->query($insert_progress)) {
                    echo "Error inserting learner progress for subject $subject_id: " . $asifunde_conn->error . "<br>";
                }
            }

            // Send email with account details
            $subject = "Asifunde Account Created";
            $message = "Dear $names,<br><br>Your account has been created!<br>
                        Your Username: <strong>$username</strong><br>
                        Your Password: <strong>$raw_password</strong><br><br>
                        Regards,<br>Asifunde Team";
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: applications@zakesmatsimbe.net.za" . "\r\n";

            // Send account details email
            if (mail($email, $subject, $message, $headers)) {
                // Success message can be added here if needed
                echo "Offer accepted successfully, <br>You will be enrolled soon,  <br>Check your emails.<br>";
            } else {
                echo "Error sending email.<br>";
            }
        } else {
            echo "Error enrolling learner: " . $asifunde_conn->error . "<br>";
        }
    }
} else {
    echo "No learner data received.<br>";
}

// Close the connection
$asifunde_conn->close();
?> 
