<?php
include 'db_connect.php';

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

$conn->query("UPDATE Learner SET Username='$username', Password='$password' WHERE Learner_ID=" . $_POST['learner_id']);

echo "Account created successfully.";
?>
