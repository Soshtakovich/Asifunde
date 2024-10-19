
<?php

$host = "sql17.cpt2.host-h.net";
$db_name = "asifunde_applications";
$user = "asifunde_apply";
$password = "Asifundeapplication2024";

// Create a connection
$conn = new mysqli($host, $user, $password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
} else {
    echo 'Connection successful';
}
?>
