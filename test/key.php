
<?php include 'include/header.php'; ?>
<div class="container">
    <div class="bs-callout bs-callout-danger">
        <h1>关键字匹配文章</h1>
        <p>随意输入中英文、拼音……关键字，列出相关文章</p>
        <strong class="text-danger">数据爬取自搜索引擎！</strong>
    </div>
    <div class="row">
        <label class="col-sm-2 control-label"><h4>任意字符：</h4></label>
        <div class="col-sm-6">
            <input type="text" class="form-control" id="searchKey" name="searchKey" placeholder="请输入……">
        </div>
        <div class="col-sm-2">
            <div class="input-group">
                <div class="input-group-addon">第</div>
                <input type="text" class="form-control" id="pageNum" name="pageNum"  value="1">
                <div class="input-group-addon">页</div>
            </div>
        </div>
        <div class="col-sm-2">
            <input type="submit" class="btn btn-primary" value=" G O " />
        </div>
    </div> 
    <div class="row">
        <label class="col-sm-2 contro-label">最热门：</label>
        <div class="col-sm-10">
            <label class="col-sm-2 contro-label">载入中……</label>
        </div>
    </div>


</div>
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
$('#header').find('li').eq(3).attr('class','active');

/*var script=null,
    topwords,
    topnews,
    hotwords,
    hotnews1,
    hotnews2;
url='http://weixin.sogou.com/pcindex/pc/web/web.js?t=1416880384876';
if(script){
    document.body.removeChild(script);
}else{
    script=document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}
*/
var top10News = <?php echo _getUrlContent('http://weixin.sogou.com/pcindex/pc/web/web.js?t=1416880384876');?>;
for (var i = 0; i < top10News.topnews.length; i++) {
    var title = top10News.topnews[i].title,
        img = top10News.topnews[i].img,
        summary = top10News.topnews[i].summary,
        cnameWX = top10News.topnews[i].account,
        timestamp = top10News.topnews[i].timestamp,
        link = top10News.topnews[i].link,
        openid = top10News.topnews[i].openid,
        date = top10News.topnews[i].date,
        str='';
};



</script>
<?php include 'include/footer.php'; ?>



