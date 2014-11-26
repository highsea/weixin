<?php 
    include 'urlhtml.php'; 

    $postKey = isset($_GET['postkey']) ? $_GET['postkey'] : 'noKey';
    $postType = isset($_GET['searchtype']) ? $_GET['searchtype'] : 'noType';
    $postPage = isset($_GET['pagenum']) ? $_GET['pagenum'] : 'noPage';
    $callback = isset($_GET['callback']) ? $_GET['callback'] : 'callback';



if ($postKey==='noKey'||$postKey=='') {
    customJsonRes('204', '没有postkey或为空', 'null');
}else{

    $key = urlencode($postKey);//urlencode(iconv('GBK', 'UTF-8', '前端'));//encodeURIComponent('前端');
    //Detected an illegal character  utf-8
    //调试
    //echo '关键字：'.$key.'搜索类型：'.$postType.'展示第'.$postPage.'页';

    switch ($postType){
    case 1:
        $searchUrl = 'http://weixin.sogou.com/weixin?query='.$key.'&type=2&page='.$postPage.'&ie=utf8';
        //echo $searchUrl;
        echo '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=Edge"/><link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css"><link rel="stylesheet" href="../bootstrap/css/bootstrap-theme.min.css"><link rel="stylesheet" type="text/css" href="../test/cssjs/default.css"><title>'.$key.'的微信公众号文章 - by HighSea</title><!--<script src="../test/cssjs/copy.js">--></script><script type="text/javascript" charset="gbk" src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script></head><body><div class="container"><div class="row"><p class="bg-success">以下内容来自微信公众平台</p></div>';
        phpQuery::newDocumentFile($searchUrl); 
        $artlist = pq(".results"); 
        //echo $artlist;

        foreach($artlist as $li){
            $description = pq($li) -> find('.wx-rb');
            echo '<div class="row alltitle">'.$description -> find('.txt-box h4') ->html().'</div>';
            echo '<div class="row">'.$description -> find('.img_box2 img') -> attr('src'); 
        }

        echo "</div></body></html>";

        break;
    case 2:
        $searchUrl = 'http://www.liepin.com/zhaopin/?searchField=1&key='.$key.'&industries=&jobTitles=&dqs=070020&compscale=&compkind=&pubTime=&salary=&searchType=1&clean_condition=&jobKind=&curPage='.$postPage;
        echo "开发中";
        break;
    case 3:
        echo "开发中";
        break;
    default:
        customJsonRes('400', 'Bad Request：请求参数不合法！', 'null');
    }
}



    function customJsonRes($code, $message, $customJson){

        $callback = isset($_GET['callback']) ? $_GET['callback'] : 'callback'; 

        $resultCacheDataJson = array(
            'code' => $code,
            'message' => $message,
            'data' => $customJson
        );

        echo $callback.'('.json_encode($resultCacheDataJson).')';
        exit;

    }

?>