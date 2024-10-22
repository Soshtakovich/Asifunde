<?php

$host = "***************************";
$db_name = "asifunde_db";
$user = "*************************";
$password = "**************************";

// Create a connection
$asifunde_conn = new mysqli($host, $user, $password, $db_name);

// Check the connection
if ($asifunde_conn->connect_error) {
    die('Asifunde Connection failed: ' . $conn->connect_error);
} else {
   // echo 'Connection successful';
}
?>
