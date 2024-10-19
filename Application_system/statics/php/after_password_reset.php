<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .success-message {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .success-message h2 {
            color: #28a745;
        }
    </style>
    <script>
        // Redirect after 5 seconds
        setTimeout(function() {
            window.location.href = "http://localhost:3000";
        }, 5000);
    </script>
</head>
<body>

<div class="success-message">
    <h2>Password Reset Successfully</h2>
    <p>Your password has been reset. You will be redirected to the homepage shortly.</p>
</div>

</body>
</html>
