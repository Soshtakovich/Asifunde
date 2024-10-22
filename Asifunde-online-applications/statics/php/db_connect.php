<?php

$host = "*************************";
$db_name = "asifunde_applications";
$user = "************************";
$password = "************************";

// Create a connection
$conn = new mysqli($host, $user, $password, $db_name);
// Check the connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
} else {
   // echo 'Connection successful';
}
?>
