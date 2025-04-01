<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'marketplace');

$result = $conn->query("SELECT * FROM items ORDER BY post_date DESC");
$items = [];

while($row = $result->fetch_assoc()) {
    $items[] = [
        'name' => $row['name'],
        'description' => $row['description'],
        'price' => $row['price'],
        'image' => $row['image_path'],
        'date' => date('m/d/Y', strtotime($row['post_date']))
    ];
}

echo json_encode($items);
$conn->close();
?>