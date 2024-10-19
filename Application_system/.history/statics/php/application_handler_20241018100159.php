<?php
include 'db_connect.php';

$surname = $_POST['surname'];
$names = $_POST['names'];
$idNumber = $_POST['idNumber'];
$dob = $_POST['dob'];
$age = $_POST['age'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

$parentSurname = $_POST['parentSurname'];
$parentNames = $_POST['parentNames'];
$parentEmail = $_POST['parentEmail'];
$relationship = $_POST['relationship'];

$conn->query("INSERT INTO Learner (Surname, Names, ID_Number, DOB, Age, Email, Username, Password) 
              VALUES ('$surname', '$names', '$idNumber', '$dob', $age, '$email', '$username', '$password')");

$learnerId = $conn->insert_id;

$conn->query("INSERT INTO Parent (Learner_ID, Surname, Names, Email, Relationship) 
              VALUES ($learnerId, '$parentSurname', '$parentNames', '$parentEmail', '$relationship')");

$response = ['message' => 'Application submitted successfully!'];
echo json_encode($response);
?>
