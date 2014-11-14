<!DOCTYPE html>
<html>
<head>
<title>查找 微信号 该微信号的最近文章</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>

<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="../bootstrap/css/bootstrap-theme.min.css">

<style type="text/css">
body{font-family: 'Microsoft YaHei'}
.bs-callout {
padding: 20px;
margin: 20px 0;
border: 1px solid #eee;
border-left-width: 5px;
border-radius: 3px;}
.bs-callout-danger{border-left-color: #d9534f;}
.redborder{border-color: #f60}
</style>
</head>
<body>
<div class="container">

    <ul class="nav nav-pills" role="tablist">
      <li role="presentation"><a href="../">Home</a></li>
      <li role="presentation" class="active"><a href="#">公众号查询</a></li>
      <li role="presentation"><a href="xml.html">公众号最近文章</a></li>
      <li role="presentation"><a href="key.php">关键词匹配文章</a></li>
    </ul>
</div>
<div class="container">
    <div class="bs-callout bs-callout-danger">
        <h1>公众号查询</h1>
        <p>随意输入中英文、拼音。</p>
        <p>获取对应公众号的文章，信息，二维码……正在开发中</p>
        <strong class="text-danger">数据来自搜索引擎。</strong>

    </div>

    <p class="bg-primary"></p>

    <form class="form-inline" role="form">
        <div class="form-group">
            <label class="sr-only" for="query">请输入公众号：</label>
            <div class="input-group">
                <div class="input-group-addon">请输入公众号：</div>
                <input type="text" class="query form-control" name="query" placeholder="中英文，拼音 都可 "/>
            </div>
        </div>
        <div class="form-group">
            <button id="submit" type="button" class="btn btn-primary">提 交</button>
        </div>
    </form>
    

    

    <h3 class="bg-success">查询结果：</h3>

    <div class="result">
        <ol class="list"></ol>
    </div>
</div>


<!-- <script src="https://a.alipayobjects.com/u/js/201204/2S07Fhc1TN.js"></script>  -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">


window.sogou = function(str){
    alert(str);
}
window.sogou.sug = function(str){

    var domList = $('.list'),
        htmlStr;
    function cHtml(){
        domList.append("<li>"+htmlStr+"</li>");
    }
    domList.html('');

    for (var i in str){
            if (typeof(str[i])!='object'&&str[i]!=''&&str[i]!='0') {
                var htmlStr= str[i];
                cHtml();
            }else{
                for (var i = 0; i < str[1].length; i++) {
                    var htmlStr = str[1][i];
                    cHtml();

                };
            }
        }
    
}

var otext = $("#submit");
otext.on('click',function(){

    var inputKey = $('.query').val();
    if (inputKey=="") {
        $('.query').addClass('redborder');
    }else{


        var script=null;
        url='http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key='+ inputKey +'&type=wxpub&ori=yes&pr=web&abtestid=&ipn=';
            
        if(script){
            document.body.removeChild(script);
        }else{
            script=document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }

    }
    
});

</script>
</body>
</html>