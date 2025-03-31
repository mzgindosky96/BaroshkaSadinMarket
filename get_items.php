<?php
include 'db.php';

$sql = "SELECT * FROM items ORDER BY created_at DESC";
$result = $conn->query($sql);

$items = [];
while($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode($items);
?>