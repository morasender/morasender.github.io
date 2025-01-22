<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "mora_mass_sender");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$email = $_POST['email'] ?? '';

if (empty($username) || empty($password) || empty($email)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email address."]);
    exit();
}

$passwordHash = password_hash($password, PASSWORD_BCRYPT);
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $passwordHash);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful."]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed. Try again."]);
}

$stmt->close();
$conn->close();
?>