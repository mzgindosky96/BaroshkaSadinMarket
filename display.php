<?php
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password is empty
$dbname = "baroshka_market"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve media from the database
$sql = "SELECT * FROM media";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $filePath = 'uploads/' . $row['filename'];
        if (strpos($row['filetype'], 'image') !== false) {
            echo "<img src='$filePath' alt='{$row['filename']}' style='max-width: 200px;'><br>";
        } elseif (strpos($row['filetype'], 'video') !== false) {
            echo "<video width='320' height='240' controls>
                    <source src='$filePath' type='{$row['filetype']}'>
                    Your browser does not support the video tag.
                  </video><br>";
        }
    }
} else {
    echo "No media found.";
}

$conn->close();
?>
