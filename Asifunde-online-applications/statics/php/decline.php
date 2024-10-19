<?php
// Include the database connection
include 'db_connect.php'; // Connection to the application database

$referenceNumber = $_GET['ref'];

// Fetch learner's email based on the reference number
$learner_query = "SELECT Email, Names FROM Learner WHERE Application_Reference = '$referenceNumber'";
$result = $conn->query($learner_query);

if ($result->num_rows > 0) {
    $learner = $result->fetch_assoc();
    $learner_email = $learner['Email'];
    $learner_name = $learner['Names'];

    // Send email notification
    $subject = "Application Offer Declined";
    $message = "Dear {$learner_name},<br><br>You have declined the application offer.<br>
                Reference Number: <strong>$referenceNumber</strong><br><br>
                If you have any questions, please feel free to contact us.<br><br>
                Regards,<br>Asifunde Team";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: applications@zakesmatsimbe.net.za" . "\r\n";

    // Send the email
    if (mail($learner_email, $subject, $message, $headers)) {
        echo "You have declined the application offer. Reference Number: $referenceNumber. A confirmation email has been sent.";
    } else {
        echo "You have declined the application offer. Reference Number: $referenceNumber. However, there was an error sending the confirmation email.";
    }
} else {
    echo "No learner found with the provided reference number.";
}

// Close the connection
$conn->close();
?>
