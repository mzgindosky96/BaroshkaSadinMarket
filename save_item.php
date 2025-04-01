<?php
$conn = new mysqli('localhost', 'root', '', 'marketplace');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// File upload handling
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["item-image"]["name"]);
move_uploaded_file($_FILES["item-image"]["tmp_name"], $target_file);

// Insert data
$stmt = $conn->prepare("INSERT INTO items (name, description, price, secret_code, image_path) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssiss", 
    $_POST['item-name'],
    $_POST['item-description'],
    $_POST['item-price'],
    $_POST['secret-code'],
    $target_file
);

if ($stmt->execute()) {
    echo "Item posted successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>