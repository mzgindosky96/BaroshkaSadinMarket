<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "baroshka saadin market";

// Create connection
$conn = new mysqli($localhost, $root, $, $products);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch products
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='product-card'>
                <img src='" . $row['image'] . "' alt='" . $row['name'] . "'>
                <h3>" . $row['name'] . "</h3>
                <p>" . $row['description'] . "</p>
                <p>Price: $" . $row['price'] . "</p>
              </div>";
    }
} else {
    echo "<p>No products available.</p>";
}

$conn->close();
?>
