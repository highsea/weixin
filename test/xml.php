
<?php include 'include/header.php'; ?>

<div class="container">

    <div class="bs-callout bs-callout-danger">
        <h1>公众号最近文章查询</h1>
        <p>当前仅支持以下公众号，请选择后使用；正在优化对搜索出的公众号进行匹配。</p>
        <p>点击对应文章的首图可以展示原图，对应文章有来源时可以点击"去看看"查看原文。</p>
        <strong class="text-danger">数据来自搜索引擎。故以浏览器爬虫机器人(遵守 Robot.txt 协议)的更新时间为准。最新更新的文章在第一页。</strong>

    </div>


<div class="selectAll">

        <div class="row">
            <label class="col-sm-2 control-label" ><h4>请选择公众号</h4></label>
            <div class="col-sm-5">
                <select class="openid form-control" >
                    
                </select>
            </div>
            <div class="col-sm-3">
                <div class="input-group ">
                    <div class="input-group-addon">查看第：</div>
                    <input type="text" class="query form-control page" name="query" placeholder="1" value="1" >
                    <div class="input-group-addon" for="">页</div>
                </div>
            </div>
            <div class="col-sm-2">
                <button id="submit" type="button" class="btn btn-primary">提 交</button>
            </div>
        </div>

    <!-- 公众号详细信息 -->
    <div class="resultHead row"></div>
    <!-- 您查询的公众号 <span class="gzh"></span>，其共有文章 <b class="wz"></b> 篇，分为 <b class="ye"></b> 页。 -->
</div>
<hr>
<div class="table-responsive">
    <table class="table table-hover table-bordered">
        <tr> 
            <td>首图</td>      
            <td>标题</td>
            <td>摘要</td>
            <td>来源</td>
            <td>日期</td>
        </tr>
    </table>
    <table class="table table-hover list"></table>
</div>



</div>
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
$('#header').find('li').eq(2).attr('class','active');
<?php 
$valueGET = isset($_GET['value']) ? $_GET['value'] : 'loading';
$cnameGET = isset($_GET['cname']) ? $_GET['cname'] : '载入中';
?>

$('.openid').prepend('<option value="<?php echo $valueGET; ?>"><?php echo $cnameGET; ?></option>');

</script>
<script src="cssjs/wechat.js"></script>
<?php include 'include/footer.php'; ?>
