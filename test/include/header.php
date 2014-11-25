<!DOCTYPE html>
<html>
<head>
<title>查找 微信号 该微信号的最近文章，热点微信文章等</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="../bootstrap/css/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css" href="cssjs/default.css">
</head>
<body>

<?php

function _getUrlContent($url){
    $handle = fopen($url, "r");
    if($handle){
        $content = stream_get_contents($handle,1024*1024);
        return $content;
    }else{
        return 'error';
    }   
}
?>
<div class="container" id="header">
    <ul class="nav nav-pills" role="tablist">
      <li role="presentation"><a href="index.php">Home</a></li>
      <li role="presentation"><a href="pub.php">公众号查询</a></li>
      <li role="presentation"><a href="xml.php">公众号最近文章</a></li>
      <li role="presentation"><a href="key.php">关键词匹配文章</a></li>
      <li role="presentation"><a href="day.php">今日热点关键字、文章</a></li>

    </ul>
</div>

