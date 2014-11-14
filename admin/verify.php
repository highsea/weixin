<?php
session_start();
// Set the content-type
header("Content-type: image/png"); // 告诉浏览器当前文件产生的结果以png形式进行输出
 
// Create the image
$im = imagecreate(200, 30);  // 创建一张宽为200,高为30的画布
 
// Create some colors
$bg = imagecolorallocate($im, 155, 100, 255); // 给画布加上背景颜色
$white = imagecolorallocate($im, 255, 255, 255);  // 三原色白色
//$grey = imagecolorallocate($im, 128, 128, 128);
$black = imagecolorallocate($im, 0, 0, 0);  // 黑色
 
$numer_array = range(0,9); // 生成一个0到9范围的数组
$abc = range('a','z');     // 生成一个a到z范围的数组
$big_abc = range('A','Z');  // 生成一A到Z范围的数组
$big_chars = array_merge($numer_array,$abc,$big_abc); // 将上述三个数组进行合并
 
 
$font = 'simsun.ttc';  // 设定字体文件的路径
$myimagecode = '';
for($i=0;$i<4;$i++){
   $str = $big_chars[rand(0,61)]; // 从合并后的数组中随机取一个字符
   $myimagecode = $myimagecode.$str; //将这个验证码字符窜存入变量myimagecode中
   $a=50*$i;
   $b=50*($i+1);
   imagettftext($im, 20, 0, mt_rand($a,$b), mt_rand(20,30), $black, $font, $str); // 将取出的字符写在画布上
}
$_SESSION['thisimagecode'] = $myimagecode;
for($i=0;$i<200;$i++){
   imagesetpixel( $im,mt_rand(0,200),mt_rand(0,30),$white); // 给画布加上点
}  
 
for($i=0;$i<4;$i++){
    imageline($im, mt_rand(0,200),mt_rand(0,30), mt_rand(0,200), mt_rand(0,30),$black  ); //给画面加上线条
}       
 
imagepng($im);  // 将图像以png形式输出
imagedestroy($im);  // 将图像资源从内存中销毁,以节约资源
?>