
<?php include 'include/header.php'; ?>
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
$('#header').find('li').eq(1).attr('class','active');
</script>
<script src="cssjs/pub.js"></script>
<?php include 'include/footer.php'; ?>
