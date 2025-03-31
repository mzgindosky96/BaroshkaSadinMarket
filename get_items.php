<?php
require 'connect.php';

$stmt = $pdo->query("SELECT * FROM items ORDER BY created_at DESC");
$items = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($items);
?>