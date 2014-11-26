
<?php include 'include/header.php'; ?>
<div class="container">
    <div class="bs-callout bs-callout-danger">
        <div class="row">
            <div class="col-md-6">
                <h1 id="navbar-default">今日最热文章、关键词</h1>
                <p>今日 搜索最多的 TOP10 关键字，以及最热门的文章</p>
                <strong class="text-danger">数据来自搜索引擎。</strong>
            </div>
            <div class="col-md-3">
                <p class="bg-info">今日TOP关键词</p>
                <ol class="topwords"> </ol>
            </div>
            <div class="col-md-3">
                <p class="bg-info">今日HOT关键词</p>
                <ol class="hotwords"> </ol>
            </div>
        </div>
    </div>

</div>
<div class="container result">

</div>

<!-- <script src="https://a.alipayobjects.com/u/js/201204/2S07Fhc1TN.js"></script>  -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
$('#header').find('li').eq(4).attr('class','active');

var top10News = <?php echo _getUrlContent('http://weixin.sogou.com/pcindex/pc/web/web.js');?>;
//http://g.search1.alicdn.com/pcindex/pc/web/web.js?t=1416880384876&_veri=20121009


var result = $('.result'),
    topwords = $('.topwords'),
    hotwords = $('.hotwords');


if (typeof(top10News)=='object') {
    result.html('<table class="table table-hover"><thead><tr><th width=10%>首图</th><th>标题</th><th>简介</th><th width="15%">微信号</th><th width="10%">时间</th></tr></thead><tbody></tbody></table>');
    //topwords
    for (var i = 0; i < top10News.topwords.length; i++) {
        var word = top10News.topwords[i].word,
            timestamp = top10News.topwords[i].timestamp,
            k = i+1,
            str = '<li>'+k+'. <a href="key.php?key='+encodeURIComponent(word)+'" target="_blank">'+word+'</li>';
            topwords.append(str);
    };
    //hotwords
    for (var i = 0; i < top10News.hotwords.length; i++) {
        word = top10News.hotwords[i].word,
        k = i+1,
        str = '<li>'+k+'. <a href="key.php?key='+encodeURIComponent(word)+'" target="_blank">'+word+'</a></li>';
        hotwords.append(str);
    };

    //topnews
    result.find('tbody').append('<tr class="top10Tr alert alert-success" role="alert"><td colspan="5">今日TOP5 话题</td></tr>');
    for (var i = 0; i < top10News.topnews.length; i++) {
        var title = top10News.topnews[i].title,
            img = top10News.topnews[i].img,
            summary = top10News.topnews[i].summary,
            cnameWX = top10News.topnews[i].account,
            timestamp = top10News.topnews[i].timestamp,
            link = top10News.topnews[i].link,
            openid = top10News.topnews[i].openid,
            date = top10News.topnews[i].date,
            str='<tr><td><a href="'+img+'" target="_blank"><img src='+img+' class="img-thumbnail"/></a></td>'
                +'<td><a href="'+link+'" target="_blank">'+title+'</a></td>'
                +'<td>'+summary+'</td>'
                +'<td class="cnameWX" data-openid="'+openid+'"><div><a href="xml.php?value='+openid+'&cname='+encodeURIComponent(cnameWX)+'"><code>'+cnameWX+'</code></div><p class="dimensional none"><img src="../images/undefined.jpg"></p></td>'
                +'<td data-timestamp="'+timestamp+'">'+date+'</td></tr>';
        result.find('tbody').append(str);
    };
    //hotnews1
    result.find('tbody').append('<tr class="hot10Tr alert alert-success" role="alert"><td colspan="5">今日HOT10 话题</td></tr>');
    for (var i = 0; i < top10News.hotnews1.length; i++) {
        var title = top10News.hotnews1[i].title,
            img = top10News.hotnews1[i].img,
            //summary = top10News.hotnews1[i].summary,
            cnameWX = top10News.hotnews1[i].account,
            timestamp = top10News.hotnews1[i].timestamp,
            link = top10News.hotnews1[i].link,
            openid = top10News.hotnews1[i].openid,
            date = top10News.hotnews1[i].date,
            str='<tr><td><a href="'+img+'" target="_blank"><img src='+img+' class="img-thumbnail"/></a></td>'
                +'<td><a href="'+link+'" target="_blank">'+title+'</a></td>'
                +'<td>无</td>'
                +'<td class="cnameWX" data-openid="'+openid+'"><div><a href="xml.php?value='+openid+'&cname='+encodeURIComponent(cnameWX)+'"><code>'+cnameWX+'</code></div><p class="dimensional none"><img src="../images/undefined.jpg"></p></td>'
                +'<td data-timestamp="'+timestamp+'">'+date+'</td></tr>';
        result.find('tbody').append(str);
    };

    //hotnews2
    for (var i = 0; i < top10News.hotnews2.length; i++) {
        var title = top10News.hotnews2[i].title,
            img = top10News.hotnews2[i].img,
            //summary = top10News.hotnews2[i].summary,
            cnameWX = top10News.hotnews2[i].account,
            timestamp = top10News.hotnews2[i].timestamp,
            link = top10News.hotnews2[i].link,
            openid = top10News.hotnews2[i].openid,
            date = top10News.hotnews2[i].date,
            str='<tr><td><a href="'+img+'" target="_blank"><img src='+img+' class="img-thumbnail"/></a></td>'
                +'<td><a href="'+link+'" target="_blank">'+title+'</a></td>'
                +'<td>无</td>'
                +'<td class="cnameWX" data-openid="'+openid+'"><div><a href="xml.php?value='+openid+'&cname='+encodeURIComponent(cnameWX)+'"><code>'+cnameWX+'</code></div><p class="dimensional none"><img src="../images/undefined.jpg"></p></td>'
                +'<td data-timestamp="'+timestamp+'">'+date+'</td></tr>';
        result.find('tbody').append(str);
    };

    cnameWXhover();
}else{
    result.html('<h1 style="text-align: center;cursor: pointer;" class="alert alert-danger" role="alert" onclick="replaceDom()">哎哟，获取TOP10失败，请 <b class="btn btn-danger"> 刷新 </b> 重试！</h1>');
};

function cnameWXhover(){
    $('.cnameWX').bind('mouseenter mouseleave', function(){
        console.log('ok');
        $(this).children('.dimensional').toggleClass('block');
    });
}
function replaceDom(){
    location.replace(location.href);
}
</script>
<?php include 'include/footer.php'; ?>
