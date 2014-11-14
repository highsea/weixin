<?php
require_once('../db/db.my.php');
header("Content-type: text/html; charset=utf-8"); 
header('Access-Control-Allow-Origin:.a.com');


$sqladmin = "select * from admin";

try{
    $connect = Db::getInstance()->connect();
} catch(Exception $e){
    echo "502";
}

$result = mysql_query($sqladmin, $connect);

while ($admin = mysql_fetch_assoc($result)) {
    $admins[] = $admin;
    echo "<pre>";
    var_dump($admins);
}


?>
