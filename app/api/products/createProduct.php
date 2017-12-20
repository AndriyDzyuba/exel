<?php
session_start();
include '../credentials.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$request->title = addslashes($request->title);
$request->text = addslashes($request->text);
$request->spec = addslashes($request->spec);
$request->price = addslashes($request->price);
$request->display = addslashes($request->display);

if ($request->ss_id) {
	$sql = "INSERT INTO Products (title, spec, text, image, price, c_id, s_id, ss_id, maker, display) VALUES ('$request->title', '$request->spec', '$request->text', '$request->image', '$request->price', '$request->c_id', '$request->s_id', '$request->ss_id', '$request->maker', '$request->display')";
} else {
	$sql = "INSERT INTO Products (title, spec, text, image, price, c_id, s_id, maker, display) VALUES ('$request->title', '$request->spec', '$request->text', '$request->image', '$request->price', '$request->c_id', '$request->s_id', '$request->maker', '$request->display')";
}

if ($conn->query($sql) === TRUE) {
 	echo "Товар додано успішно.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
