<?php
$dbhandle = sqlite_open('data.db', 0666, $error);
if (!$dbhandle) die ($error);

if (isset($_GET['create']) && $_GET['create'] = 'yes') {
    $query = "CREATE TABLE scores(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, score INT NOT NULL) ;";
    if (!sqlite_exec($dbhandle, $query)) {
        die('Could not create.');
    };
    echo "Successfully created database.";
} else if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['score'])) {
    $name = sqlite_escape_string($_POST['name']);
    $email = sqlite_escape_string($_POST['email']);
    $score = intval($_POST['score']);
    $query = "INSERT INTO scores (name, email, score) VALUES ('$name', '$email', $score)";
    if (!sqlite_exec($dbhandle, $query)) {
        die('Could not save.');
    };
    echo "Success";
} else {
    $query = "SELECT * FROM scores";
    $result = sqlite_query($dbhandle, $query);
    if (!$result) die("Cannot execute query.");
    while ($row = sqlite_fetch_array($result, SQLITE_ASSOC)) {
        var_dump($row);
        echo "<br>";
    }
}

sqlite_close($dbhandle);