<?php
session_start();
include '../credentials.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);



$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if ($request->images) {
	$request->images = serialize($request->images);
}

$request->title = addslashes($request->title);
$request->eng_title = addslashes($request->eng_title);
$request->text = addslashes($request->text);

$sql = "INSERT INTO Subcats (title, eng_title, text, images, c_id) VALUES ('$request->title', '$request->eng_title', '$request->text', '$request->images', '$request->c_id')";

if ($conn->query($sql) === TRUE) {
 	echo "Напрям '" . $request->title . "' створено успішно.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
