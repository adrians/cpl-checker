<?php

$memcachedConn = new Memcached();
$memcachedConn->addServer('localhost', 11211);
$data = $memcachedConn->get($_GET['prefix']);

if($_GET['type'] == "js") {
    header("Content-Type: application/javascript");
} else {
    header("Content-Type: text/plain");
}
header("Cache-Control: no-store");
echo $data;
?>
