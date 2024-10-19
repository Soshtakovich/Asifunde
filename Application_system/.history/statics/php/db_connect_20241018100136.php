<?php
$host = 'sql17.cpt2.host-h.net';
$user = 'asifunde';
$password = 'Asifundezakes2024';
$db_name = 'asifunde_db';

$conn = new mysqli($host, $user, $password, $db_name);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>
