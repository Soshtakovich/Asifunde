<?php
include 'asifunde_db_connect.php';

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the form is submitted with valid inputs
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email']) && isset($_POST['new_password'])) {
    // Sanitize input data
    $email = $asifunde_conn->real_escape_string($_POST['email']);
    $new_password = $asifunde_conn->real_escape_string($_POST['new_password']);

    // Check if the password length is at least 5 characters
    if (strlen($new_password) < 5) {
        echo "Password must be at least 5 characters.";
        exit();
    }

    // Check if the email exists in the Learner table
    $check_email_query = "SELECT * FROM Learner WHERE Email = '$email'";
    $result = $asifunde_conn->query($check_email_query);

    if ($result->num_rows > 0) {
        // Learner exists, proceed with password update
        $raw_password = $new_password; // Use raw password as provided by the user
        $hashed_password = password_hash($new_password, PASSWORD_BCRYPT); // Hash the password

        // Update the learner's password in the Learner table
        $update_password_query = "UPDATE Learner SET Password = '$hashed_password' WHERE Email = '$email'";
        if ($asifunde_conn->query($update_password_query) === TRUE) {
            // Send email with the new password
            $subject = "Asifunde Password Reset";
            $message = "Dear Learner,<br><br>Your password has been reset.<br>
                        Your new password is: <strong>$raw_password</strong><br><br>
                        Regards,<br>Asifunde Team";
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: applications@zakesmatsimbe.net.za" . "\r\n";

            if (mail($email, $subject, $message, $headers)) {
                // Redirect to after_password_reset.php
                header("Location: after_password_reset.php");
                exit();
            } else {
                echo "Error sending password reset email.";
            }
        } else {
            echo "Error updating password: " . $asifunde_conn->error;
        }
    } else {
        echo "Email not found in the system.";
    }
} else {
    echo "Invalid form submission.";
}

// Close the connection
$asifunde_conn->close();
?>
