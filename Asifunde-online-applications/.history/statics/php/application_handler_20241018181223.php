<?php
include 'db_connect.php'; // Assuming this file contains the database connection code

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve learner data
    $surname = $conn->real_escape_string($_POST['surname']);
    $names = $conn->real_escape_string($_POST['names']);
    $id_number = $conn->real_escape_string($_POST['id_number']);
    $gender = $conn->real_escape_string($_POST['gender']);
    $dob = $conn->real_escape_string($_POST['dob']);
    $age = $conn->real_escape_string($_POST['age']);
    $location = $conn->real_escape_string($_POST['location']);
    $address = $conn->real_escape_string($_POST['address']);
    $email = $conn->real_escape_string($_POST['email']);
    $cell_number = $conn->real_escape_string($_POST['cell_number']);
    $whatsapp_number = $conn->real_escape_string($_POST['whatsapp_number']);
    $grade = $conn->real_escape_string($_POST['grade']);
    $school = $conn->real_escape_string($_POST['school']);

    // Sanitize and retrieve parent data
    $parent_surname = $conn->real_escape_string($_POST['parent_surname']);
    $parent_names = $conn->real_escape_string($_POST['parent_names']);
    $parent_gender = $conn->real_escape_string($_POST['parent_gender']);
    $parent_dob = $conn->real_escape_string($_POST['parent_dob']);
    $parent_email = $conn->real_escape_string($_POST['parent_email']);
    $parent_cell_number = $conn->real_escape_string($_POST['parent_cell_number']);
    $parent_whatsapp_number = $conn->real_escape_string($_POST['parent_whatsapp_number']);
    $relationship = $conn->real_escape_string($_POST['relationship']);
    $education = $conn->real_escape_string($_POST['education']);
    $employment = $conn->real_escape_string($_POST['employment']);
    $parent_address = $conn->real_escape_string($_POST['parent_address']);

    // Insert learner information
    $learner_query = "INSERT INTO Learner (Surname, Names, ID_Number, Gender, DOB, Age, Location, Address, Email, Cell_number, Whatsapp_number, Grade, School) 
                      VALUES ('$surname', '$names', '$id_number', '$gender', '$dob', '$age', '$location', '$address', '$email', '$cell_number', '$whatsapp_number', '$grade', '$school')";

    if ($conn->query($learner_query) === TRUE) {
        $learner_id = $conn->insert_id; // Get the last inserted learner ID

        // Insert parent information using the learner_id
        $parent_query = "INSERT INTO Parent (Learner_ID, Surname, Names, Gender, DOB, Email, Cell_number, Whatsapp_number, Relationship, Education, Employment, Address) 
                         VALUES ('$learner_id', '$parent_surname', '$parent_names', '$parent_gender', '$parent_dob', '$parent_email', '$parent_cell_number', '$parent_whatsapp_number', '$relationship', '$education', '$employment', '$parent_address')";

        if ($conn->query($parent_query) === TRUE) {
            echo "Application submitted successfully!";
        } else {
            echo "Error: " . $parent_query . "<br>" . $conn->error;
        }
    } else {
        echo "Error: " . $learner_query . "<br>" . $conn->error;
    }

    $conn->close();
}
?>

