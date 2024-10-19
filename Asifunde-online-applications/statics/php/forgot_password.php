<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .forgot-password-form {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }
        .forgot-password-form h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .forgot-password-form input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .forgot-password-form button {
            width: 100%;
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .forgot-password-form button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<div class="forgot-password-form">
    <h2>Forgot Password</h2>
    <form action="reset_password.php" method="POST">
        <input type="email" name="email" placeholder="Enter your email" required>
        <input type="password" name="new_password" placeholder="Enter new password" minlength="5" required>
        <button type="submit">Reset Password</button>
    </form>
</div>

</body>
</html>
