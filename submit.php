<?php
$filename = 'data.csv';

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['score'])) {
    $data = $_POST['name'].','.$_POST['email'].','.$_POST['score']."\n"; // double quotes needed to get newline
    file_put_contents($filename, $data, FILE_APPEND | LOCK_EX);
} else {
    die('Data not specified');
}
