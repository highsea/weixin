weixin
======

###公开接口：

#### 查询公众号接口： [尝鲜一下查公众号][1]

	http://wechat.highsea90.com/toolsapi/index.php?variable=weixin&pagenum=1&postkey=high

###### 返回结果：

![查询公众号返回结果][2]


###### 参数说明

> variable 查询分类（因为这个接口还能查其他的……）这里是 <code>weixin</code>

> postkey 查询的关键字，比如 <code>high</code>

> pagenum 查询结果翻页（可选）

* **缓存** 每查询一次 <code>key</code> 服务器会生成当前查询的关键字 <code>key</code> 的缓存，第二次相同KEY查询就从缓存获取：如下

	<code>message: "fresh data",//第一次</code>
	<code>message: "cache data",//第二次</code> 

#### 查询文章接口： [尝鲜一下查文章][3]
	
	http://wechat.highsea90.com/toolsapi/index.php?variable=wxwords&pagenum=1&postkey=high


###### 返回结果：

![查询文章返回结果][4]

###### 参数说明

> variable 这里是 <code>wxwords</code>

> postkey 查询的关键字，比如 <code>high</code>

> pagenum 查询结果翻页（可选）


### 工具截图

![公众号页面][5]
![文章页面][8]
![关键字搜索页面][7]
![热点词页面][6]






[1]: http://wechat.highsea90.com/toolsapi/index.php?variable=weixin&pagenum=1&postkey=high  "公众号查询"
[2]: http://images.cnitblog.com/blog/531703/201502/051650343285503.gif "查询公众号返回结果"
[3]: http://wechat.highsea90.com/toolsapi/index.php?variable=wxwords&pagenum=1&postkey=high "文章查询"
[4]: http://images.cnitblog.com/blog/531703/201502/051701462494946.gif "查询文章返回结果"
[5]: http://images.cnitblog.com/blog/531703/201502/051742132492808.gif "公众号页面"
[6]: http://images.cnitblog.com/blog/531703/201502/051742377498026.gif "热点词页面"
[7]: http://images.cnitblog.com/blog/531703/201502/051743386564799.gif "关键字搜索页面"
[8]: http://images.cnitblog.com/blog/531703/201502/051744213281104.gif "文章页面"
