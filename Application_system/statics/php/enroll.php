<?php
// Include the database connection for the application database
include 'db_connect.php'; // Connection to the application database (asifunde_applications)

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the action is to accept the offer
if (isset($_GET['action']) && $_GET['action'] == 'accept' && isset($_GET['ref'])) {
    // Escape the reference for security
    $reference = $conn->real_escape_string($_GET['ref']); 
    //echo "Reference: $reference<br>"; // Debugging output

    // Fetch learner info based on the application reference number from the application database
    $learner_query = "SELECT * FROM Learner WHERE Application_Reference = '$reference'";
    //echo "Query: $learner_query<br>"; // Debugging output

    $result = $conn->query($learner_query);

    if ($result === FALSE) {
        die("Database query failed: " . $conn->error); // Debugging output
    }

    if ($result->num_rows > 0) {
        $learner = $result->fetch_assoc();
       // echo "Learner found: " . print_r($learner, true) . "<br>"; // Debugging output

        // Prepare data for the second file
        $learner_data = [
            'Surname' => $learner['Surname'],
            'Names' => $learner['Names'],
            'ID_Number' => $learner['ID_Number'],
            'Gender' => $learner['Gender'],
            'DOB' => $learner['DOB'],
            'Age' => $learner['Age'],
            'Location' => $learner['Location'],
            'Address' => $learner['Address'],
            'Email' => $learner['Email'],
            'Cell_number' => $learner['Cell_number'],
            'Whatsapp_number' => $learner['Whatsapp_number'],
            'Grade' => $learner['Grade'],
            'School' => $learner['School'],
            'Reference' => $reference
        ];

        // Redirect to the second file and pass the learner data
        header("Location: insert_learner.php?" . http_build_query($learner_data));
        exit();
    } else {
        echo "No learner found with the provided application reference.<br>"; // Debugging output
    }
} else {
    echo "Invalid action or reference.<br>"; // Debugging output
}

// Close the connection
$conn->close();
?>
