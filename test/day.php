
<?php include 'include/header.php'; ?>
<div class="container">
    <div class="bs-callout bs-callout-danger">
        <h1 id="navbar-default">今日最热门文章</h1>
        <p>今日 搜索最多的 TOP10 关键字，以及最热门的文章</p>
        <strong class="text-danger">数据来自搜索引擎。</strong>
    </div>

</div>


<!-- <script src="https://a.alipayobjects.com/u/js/201204/2S07Fhc1TN.js"></script>  -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
$('#header').find('li').eq(4).attr('class','active');


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
