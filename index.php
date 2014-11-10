<!DOCTYPE html>
<html>
<head>
    <title>查找 微信公众号</title>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
	<script src="https://a.alipayobjects.com/u/js/201204/2S07Fhc1TN.js"></script> 

</head>
<body>

	<div>
		请输入公众号：(中文，英文，拼音 都可以) <a href="xml.html" target="_blank"> 公众号文章查询</a> <br>
		<input type="text" class="query" name="query" /><input type="button" value="提交" id="submit" /><br>
		查询结果：
		<div class="result">
			<ul class="list"></ul>
		</div>
	</div>
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
    var script=null;
    url='http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key='+ inputKey +'&type=wxpub&ori=yes&pr=web&abtestid=&ipn=';
        
    if(script){
        document.body.removeChild(script);
    }else{
        script=document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    }


    
});

</script>
</body>
</html>