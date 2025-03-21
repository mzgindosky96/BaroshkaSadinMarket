<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "baroshka saadin market";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

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
                <img src='" . htmlspecialchars($row['image']) . "' alt='" . htmlspecialchars($row['name']) . "'>
                <h3>" . htmlspecialchars($row['name']) . "</h3>
                <p>" . htmlspecialchars($row['description']) . "</p>
                <p>Price: $" . number_format((float)$row['price'], 2) . "</p>
              </div>";
    }
} else {
    echo "<p>No products available.</p>";
}

$conn->close();
?>
