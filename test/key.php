
<?php include 'include/header.php'; ?>
<?php include '../geturl/urlhtml.php'; ?>

<div class="container">
    <div class="bs-callout bs-callout-danger">
        <h1>关键字匹配文章</h1>
        <p>随意输入中英文、拼音……关键字，列出相关文章</p>
        <strong class="text-danger">数据爬取自搜索引擎！</strong>
    </div>
    <div class="row">
        <label class="col-sm-2 control-label"><h4>任意字符：</h4></label>
        <div class="col-sm-6">
            <label for="searchKey" class="placeholder">请输入………</label>
            <input type="text" class="form-control" id="searchKey" name="searchKey" value="">
        </div>
        <div class="col-sm-2">
            <div class="input-group">
                <div class="input-group-addon">第</div>
                <input type="text" class="form-control" id="pageNum" name="pageNum"  value="1">
                <div class="input-group-addon">页</div>
            </div>
        </div>
        <div class="col-sm-2">
            <input type="submit" class="btn btn-primary searchGo" value=" G O " />
        </div>
    </div> 
    <div class="row">
        <label class="col-sm-2 contro-label">随便选一个</label>
        <div class="col-sm-10 random">
            <label class="col-sm-1 contro-label">创业</label>
            <label class="col-sm-1 contro-label">机器人</label>
            <label class="col-sm-1 contro-label">热门职位</label>
            <label class="col-sm-1 contro-label">APEC</label>
            <label class="col-sm-1 contro-label">大数据</label>
            <label class="col-sm-1 contro-label">购物</label>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">

    <iframe id="refresh_view" width="100%" frameborder='0' scrolling="no" ></iframe>

    </div>
</div>
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
$('#header').find('li').eq(3).attr('class','active');

var randomLabel = $('.random').find('label'),
    searchKey = $('#searchKey'),
    searchGo = $('.searchGo'),
    pageNum = $('#pageNum').val(),
    placeholder = $('.placeholder'),
    key_GET = decodeURIComponent("<?php echo isset($_GET['key']) ? $_GET['key'] : '请输入………'; ?>");
if (key_GET==='请输入………'){

}else{
    placeholder.text(key_GET);
    placeholder.addClass('placeholderHigh');
    //执行搜索
    urlhtmlResult(key_GET,pageNum);

};

//聚焦判断
$('#searchKey').on('focusin focusout', function(){
    placeholder.toggleClass('none'); 
    if (searchKey.val()!='') {
        placeholder.addClass('none');
    }else{
        placeholder.removeClass('none');
    };
});


    
//随便选一个
randomLabel.on('click',function(){

    var thisText = $(this).text();
    searchKey.val('');
    placeholder.removeClass('none').text(thisText).addClass('placeholderHigh');//显示label，值，高亮
    //searchKey.val(thisText);//设置value
    //执行搜索
    urlhtmlResult(thisText,pageNum);
});
//搜索判断
searchGo.on('click', function(){
    if (searchKey.val()==''&&placeholder.text()=='请输入………') {
        $('#searchKey').addClass('redborder');
    }else{
        nowKey = searchKey.val()=='' ? placeholder.text() : searchKey.val();
        //console.log(nowKey);
    //执行搜索
        urlhtmlResult(nowKey,pageNum);
    };
});

//var domain = window.location.host;

function urlhtmlResult(key,page){
    var searchtype = '1',
        url = '../geturl/searchapi.php?postkey='+key+'&pagenum='+page+'&searchtype='+searchtype;

    $('#refresh_view').attr('src',url);
    //调试
    //link = 'http://weixin.sogou.com/weixin?query='+key+'&type=2&page=1&ie=utf8';
    //var href = window.location.href;
    //window.location.href = href.substr(0, href.indexOf('#')) + '#' + link;
    return false;
}

</script>
<?php include 'include/footer.php'; ?>



