<?php
$data = json_decode(file_get_contents("php://input"));

$host = "localhost";
$user = "calendar-manager";
$password = "calendar-manager";
$db = "calendarmanager";

// Create connection
$con = new mysqli($host, $user, $password, $db);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

echo "OK";

?>