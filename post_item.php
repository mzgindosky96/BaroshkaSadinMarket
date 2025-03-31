<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $imagePath = $uploadDir . basename($_FILES['image']['name']);
    
    // Move uploaded file
    if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        $stmt = $pdo->prepare("INSERT INTO items (name, description, price, image) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $_POST['name'],
            $_POST['description'],
            $_POST['price'],
            $imagePath
        ]);
        
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File upload failed']);
    }
}
?>