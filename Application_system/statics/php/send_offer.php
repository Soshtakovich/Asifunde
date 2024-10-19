<?php
$learnerEmail = $email; // From the application_handler.php
$referenceNumber = $application_reference; // From the application_handler.php

$acceptLink = "https://zakesmatsimbe.net.za/Application_system/statics/php/enroll.php?ref=$referenceNumber&action=accept";
$declineLink = "https://zakesmatsimbe.net.za/Application_system/statics/php/decline.php?ref=$referenceNumber";

$subject = "Asifunde Application Offer: '$referenceNumber'"; // Fixed line
$message = "Dear $names,<br><br>Your application has been accepted!<br> 
Please click the link below to accept the offer:<br>
<a href='$acceptLink'>Accept Offer</a><br>
Or click below to decline the offer:<br>
<a href='$declineLink'>Decline Offer</a><br><br>Regards,<br>Asifunde Team";

$headers = "From: applications@zakesmatsimbe.net.za\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

if (mail($learnerEmail, $subject, $message, $headers)) {
    echo "Application submitted successfully, check your emails for further communication.";
} else {
    echo "Failed to send the offer email.";
}
?>
