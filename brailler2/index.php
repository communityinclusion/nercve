<?php
#ini_set('display_errors', 'On');
#error_reporting(E_ALL);
if (true) { // && $_SERVER['REMOTE_ADDR'] == '158.121.240.51' || true) {
	define('TABLE_PREFIX','B0_');
	define('DIR','/brailler2/');
    if (file_exists('/home/nercve/nercve.org/brailler2/content/index.php')) {
        include('/home/nercve/nercve.org/brailler2/content/index.php');
    } else {
        include(__DIR__ . '/../../brailler2/content/index.php');
    }
} else {
	header('Location: ./index.html');
}
?>
