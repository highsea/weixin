var server_url = "http://www.sogou.com/";
function sugTemplate() {}
if ((window.navigator.appName.toUpperCase().indexOf("MICROSOFT") >= 0) && (document.execCommand)) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch(e) {}
}
sugTemplate.prototype.vmap = {
	"60": ".v.4",
	"69": ".v.1",
	"91": ".v.1",
	"97": ".v.4",
	"113": ".v.1",
	"137": ".v.1",
	"145": ".v.2",
	"163": ".v.2",
	"164": ".v.2",
	"166": ".v.1",
	"191": ".v.3",
	"206": ".v.1",
	"210": ".v.3",
	"244": ".v.1",
	"273": ".v.1",
	"312": ".v.1",
	"317": ".v.3",
	"376": ".v.1",
	"322": ".v.1",
	"330": ".v.1",
	"349": ".v.2",
	"10001": ".v.1",
	"10002": ".v.1",
	"10004": ".v.1"
};
sugTemplate.prototype.cutTitle = function(j, b) {
	var h = navigator.userAgent.indexOf("MSIE 6") != -1 && !window.opera;
	if (h) {
		j.style.height = null
	}
	var f = "...",
	g;
	j.innerHTML = "我";
	g = j.offsetHeight;
	var d = /^(.*?)(<b>(.*?)<\/b>)?(<span><\/span>)?$/i.exec(b);
	var a = [d[1], d[3], d[4] ? d[4] : ""];
	var c = a[0].length + (a[1] ? a[1].length: 0);
	j.innerHTML = b;
	while (j.offsetHeight > g * 5 / 4) {
		j.innerHTML = a[0].substring(0, c) + (c > a[0].length ? "<b>" + a[1].substring(0, c - a[0].length) + f + "</b>": f) + a[2];
		c--
	}
	if (h) {
		j.style.height = "27px"
	}
};
sugTemplate.prototype.cutAllTitle = function(a, c) {
	for (var b = 0; b < a.length; b++) {
		this.cutTitle(a[b], c[b])
	}
};
sugTemplate.prototype.revertAllTitle = function(a, c) {
	for (var b = 0; b < a.length; b++) {
		a[b].innerHTML = c[b]
	}
};
sugTemplate.prototype.len = function(a) {
	return a.replace(/\[\/?em\]/g, "").replace(/[^\x00-\xff]/g, "rr").length
};
sugTemplate.prototype.cutLength = function(d, a, b, c) {
	b = b || "...";
	c = c || 3;
	if (this.len(d) > a) {
		do {
			if (d.lastIndexOf("[em]") == d.length - 4) {
				d = d.substring(0, d.length - 4)
			} else {
				if (d.lastIndexOf("[/em]") == d.length - 5) {
					d = d.substring(0, d.length - 5)
				} else {
					d = d.substring(0, d.length - 1)
				}
			}
		}
		while (d && (this.len(d) + c > a));
		if (d.lastIndexOf("[/em]") < d.lastIndexOf("[em]")) {
			d = d.substring(0, d.lastIndexOf("[em]")) + d.substring(d.lastIndexOf("[em]") + 4)
		}
		return d + b
	}
	return d
};
sugTemplate.prototype.$c = function(d, c, a) {
	var b = document.createElement(d);
	if (c) {
		c.appendChild(b)
	}
	if (a) {
		b.className = a
	}
	return b
};
sugTemplate.prototype.$ = function(a) {
	return document.getElementById(a)
};
sugTemplate.prototype.parseXML = function(a) {
	if (window.DOMParser) {
		tmp = new DOMParser();
		xml = tmp.parseFromString(a, "text/xml")
	} else {
		xml = new ActiveXObject("Microsoft.XMLDOM");
		xml.async = "false";
		xml.loadXML(a)
	}
	return xml.documentElement
};
sugTemplate.prototype.selectNodes = function(d, f) {
	function h(k, n) {
		var m = [];
		for (var o = 0; o < k.length; o++) {
			for (var l = 0; l < k[o].childNodes.length; l++) {
				if (k[o].childNodes[l].nodeName == n) {
					m[m.length] = k[o].childNodes[l]
				}
			}
		}
		return m
	}
	var b = [];
	var a = [d];
	var g = f.split("/");
	for (var c = 0; c < g.length; c++) {
		a = h(a, g[c]);
		if (a == null) {
			return []
		}
	}
	return a
};
sugTemplate.prototype.buildTitle = function(f, c, a, d) {
	var b = this.$c("h3", f, "sugtype");
	b.innerHTML = ['<a id="sgtitle" onfocus="this.blur();" href="', a ? (a + '" target="_blank') : ("/sogou?ie=utf8&query=" + c.query), '">', this.cutLength(d ? d: decodeURIComponent(c.query), 44), "</a>"].join("");
	return b
};
sugTemplate.prototype.buildMoreHint = function(d, b) {
	var a = this.$c("div", d, "morehint");
	var c = this.$c("a", a);
	c.innerHTML = "更多相关结果&gt;&gt;";
	c.href = "http://www.sogou.com/web?query=" + b.query;
	c.target = "_blank";
	c.setAttribute("hideFocus", "hidefocus")
};
sugTemplate.prototype.markRed = function(c, b, a) {
	b = b || "<em>";
	a = a || "</em>";
	if (c.indexOf(b) > 0) {
		return c
	}
	if (c.indexOf("[em]") >= 0) {
		c = c.replace(/\[em\]/g, b).replace(/\[\/em\]/g, a)
	}
	return c
};
sugTemplate.prototype.escape = function(a) {
	return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
sugTemplate.prototype.cutRed = function(a) {
	return a.replace(/\[\/?em\]/g, "")
};
sugTemplate.prototype.buildVRTitle = function(a, d, c) {
	var b = this.$c("a", this.$c("h3", a, "se_embed_title"));
	var f = d.title;
	f = this.cutLength(f, c);
	f = this.escape(f);
	f = this.cutRed(f);
	b.href = d.url;
	b.target = "_blank";
	b.title = this.cutRed(d.title);
	b.innerHTML = f;
	return b
};
sugTemplate.prototype.buildContent = function(a, g) {
	var k = this.$c("div", a, "querylist");
	for (var h = 0; h < 2; h++) {
		var b = this.$c("a", k, "qitem");
		b.target = "_blank";
		b.href = g.docs[h].url;
		b.onfocus = function() {
			this.blur()
		};
		var f = this.$c("strong", b, "qtitle");
		var j = this.$c("span", f, "siteico");
		if (g.docs[h].favicon) {
			j.style.background = "url(" + g.docs[h].favicon + ") no-repeat scroll 6px 50% transparent"
		}
		j.innerHTML = this.cutLength(g.docs[h].title, 54);
		if (g.docs[h].content) {
			var c = this.$c("span", b, "qsummary");
			c.innerHTML = this.cutLength(this.escape(g.docs[h].content), 106)
		}
		var d = this.$c("span", b, "qcite");
		if (g.docs[h]["url"] && g.docs[h]["url"].indexOf("://") > 0) {
			d.innerHTML = decodeURIComponent(g.docs[h]["url"].split("://")[1].split("/")[0])
		} else {
			d.innerHTML = "www.sogou.com"
		}
	}
	this.buildMoreHint(a, g)
};
sugTemplate.prototype.build = function(a, d, n, l, c) {
	if (!d) {
		return false
	}
	var h = this,
	m = -1,
	f = 0;
	for (; f < n.length; f++) {
		if (n[f] == decodeURIComponent(d.query)) {
			m = f;
			break
		}
	}
	h.pv(d.query, d.type || "-1", m, d.doc_num || 0);
	l[m] = d.type || "-1";
	if (!d.doc_num || !d.docs) {
		return false
	}
	a.onclick = function(r) {
		if ((r && (r.button != 0)) || ((!r) && (window.event.button != 0))) {
			return
		}
		try {
			r = r || window.event;
			var t = ((r.target) ? r.target: r.srcElement),
			q;
			while (t && t.tagName) {
				q = t.tagName.toUpperCase();
				if (q == "A") {
					h.pv(d.query, d.type, m, d.doc_num, t.id || "sgcontent", t.href)
				}
				if (q == "DIV") {
					break
				}
				t = t.parentNode
			}
		} catch(s) {}
	};
	if (!d.type || d.type == 100) {
		a.innerHTML = "";
		this.buildTitle(a, d);
		this.buildContent(a, d)
	} else {
		if (d.type == 10000) {
			try {
				var g = this.parseXML(d.docs[0].xml);
				var b = g.getAttribute("type");
				d.qaType = parseInt(b);
				d.type = 10000 + d.qaType;
				d.qaTag = c[decodeURIComponent(d.query)].tupu_key
			} catch(k) {}
		}
		if (!this["build" + d.type]) {
			if ((d.type == "317" || d.type == "60") && !h.curtime) {
				if (window.standardtime) {
					var o = window.standardtime;
					window.standardtime = function(r, q) {
						h.curtime = r;
						return o(r, q)
					}
				} else {
					window.standardtime = function(r, q) {
						h.curtime = r
					}
				}
				var p = document.createElement("script");
				p.charset = "gb2312";
				p.src = "websearch/features/standardtimeadjust.jsp?a=" + Math.random();
				document.body.appendChild(p)
			}
			var j = document.createElement("script");
			j.charset = "gb2312";
			j.src = server_url + "js/sugtemp/build" + d.type + (this.vmap[d.type] || "") + ".js";
			document.body.appendChild(j)
		}
		this.buildVR(a, d, 0)
	}
	return true
};
sugTemplate.prototype.buildVR = function(b, c, d) {
	if (typeof this["build" + c.type] == "function") {
		try {
			var a = c.docs,
			j = a[0],
			f = this.parseXML(a[0].xml);
			try {
				j.url = this.selectNodes(f, "url")[0].firstChild.nodeValue
			} catch(h) {}
			try {
				j.title = this.selectNodes(f, "title")[0].firstChild.nodeValue
			} catch(h) {}
			try {
				j.domain = j.url.split("://")[1].split("/")[0]
			} catch(h) {}
			b.innerHTML = "";
			this["build" + c.type](b, c, j, f)
		} catch(k) {}
	} else {
		if (d <= 10) {
			var g = this;
			setTimeout(function() {
				g.buildVR(b, c, d + 1)
			},
			30)
		} else {
			b.innerHTML = "";
			this.buildTitle(b, c);
			this.buildContent(b, c)
		}
	}
};
sugTemplate.prototype.reg = new RegExp("{{(.*?)}}", "g");
sugTemplate.prototype.pv = function(g, d, h, c, a, b) {
	try {
		imgurl = ["http://pb.sogou.com/", a ? "cl.gif": "pv.gif", "?uigs_productid=webgo"];
		imgurl.push("&query=");
		imgurl.push(encodeURIComponent(g));
		imgurl.push("&type=");
		imgurl.push(d);
		imgurl.push("&pos=");
		imgurl.push(h);
		imgurl.push("&num=");
		imgurl.push(c);
		if (!a) {
			if (this.lastpv == imgurl.join("")) {
				return
			}
			this.lastpv = imgurl.join("")
		} else {
			imgurl.push("&uigs_cl=");
			imgurl.push(a);
			imgurl.push(encodeURIComponent("&href=" + b))
		}
		imgurl.push("&uigs_t=");
		imgurl.push((new Date()).getTime()); (new Image()).src = imgurl.join("")
	} catch(f) {}
};
sugTemplate.prototype.buildTemplate = function(b, a) {
	var d = this;
	function c(f, h) {
		h = h.split("@");
		var g = d.selectNodes(a, "" + h[0]);
		if (g.length > 0) {
			if (h.length > 1) {
				return g[0].getAttribute(h[1])
			} else {
				return g[0].firstChild.nodeValue.replace(/\ue40a/g, "").replace(/\ue40b/g, "")
			}
		}
		return ""
	}
	return b.replace(this.reg, c)
};
function sogouSugg(newPara) {
	if (typeof SugPara != "object") {
		SugPara = {}
	}
	var isIe = navigator.userAgent.indexOf("MSIE") != -1 && !window.opera;
	var that = this,
	tophint,
	MAX_RETRY_FETCH_SITE = 3,
	handleRetry = MAX_RETRY_FETCH_SITE - 1,
	template = new sugTemplate(),
	myPara = newPara || SugPara,
	on = newPara ? 0: 1,
	d = document,
	inputid = myPara.inputid || "query",
	sugType = myPara.sugType || "web",
	bigsize = myPara.bigsize || false,
	productId = myPara.productId || sugType,
	postFix = myPara.postFix || "",
	preFix = myPara.preFix || "",
	revsd = myPara.revsd || 0,
	suggestRid = myPara.suggestRid || "",
	normalRid = myPara.normalRid || "",
	enableSug = true,
	useParent = myPara.useParent || 0,
	abtestid = myPara.abtestid || "",
	ipn = myPara.ipn || "",
	domain = myPara.domain || "http://w.sugg.sogou.com",
	uri = myPara.uri || "/sugg/ajaj_json.jsp",
	suggUri = domain + uri,
	firstRun = 1,
	suggDiv,
	suggIfm = null,
	suggLis = [],
	suggOText = [],
	input_elem,
	input_form,
	mousedown_ontr = 0,
	noneed_query = "",
	lastinput_query = "",
	sending_timer = 0,
	highlight_li = -1,
	jsonData = [],
	jsonDataTongji = [],
	jsonDataTongji0 = [],
	jsonDataTongji1 = [],
	jsonDataTongji2 = [],
	goTongjiId = [],
	hasPersonal = 0,
	hasPersonal1 = 0,
	userInputString = "",
	cache = {},
	sitecache = {},
	ajaj = null,
	ajaj2 = null,
	ajajPinyin = null,
	originalQuery = "",
	suggestWordId = -1,
	input_time = 0,
	oldfunc = function() {},
	oldfunc2 = function() {},
	contentDiv,
	siteTimer,
	setTimer1,
	setTimer2,
	setTimer3,
	hideTimer,
	$c = sugTemplate.prototype.$c,
	handleFlag = handleRetry,
	vrFlag = {},
	sugData = {},
	cur_li = -1,
	isKeyTime = false,
	mouseTime_li = -1;
	that.sw = function(kw, sw) {
		if (!sw) {
			try {
				handleData(["", []])
			} catch(E) {}
		}
		on = sw || false;
		noneed_query = kw || "";
		showtop = true;
		if (suggDiv) {
			hideDiv()
		}
	};
	that.sugTypeChange = function(_sugType) {
		sugType = _sugType;
		cache = {}
	};
	function $(elemid) {
		return d.getElementById(elemid)
	}
	function bind(elem, evt, func) {
		if (elem) {
			return elem.addEventListener ? elem.addEventListener(evt, func, false) : elem.attachEvent("on" + evt, func)
		}
	}
	function pingback(action_name) {
		var now = new Date();
		var uigs_t = (now.getTime()) * 1000 + Math.round(Math.random() * 1000);
		var uigs_productid = "";
		if (sugType != "") {
			uigs_productid = "sugg" + sugType
		}
		var url1 = ["http://pb.sogou.com/pv.gif", "?uigs_productid=", encodeURIComponent(uigs_productid), "&uigs_t=", uigs_t, "&w=", encodeURIComponent(input_elem.value), "&k=", encodeURIComponent(userInputString), "&s="];
		url1.push((suggestWordId != -1) ? "t": "f");
		if (suggestWordId != -1) {
			url1.push("&stj0=" + jsonDataTongji0[suggestWordId]);
			url1.push("&stj1=" + jsonDataTongji1[suggestWordId])
		}
		url1.push("&hp=" + hasPersonal);
		url1.push("&hp1=" + hasPersonal1);
		if (suggestWordId != -1) {
			url1.push("&cline=");
			url1.push(suggestWordId)
		}
		if (action_name) {
			url1.push("&act=");
			url1.push(encodeURIComponent(action_name))
		}
		url1.push("&r=" + now.getSeconds());
		url1.push("&abtestid=" + encodeURIComponent(abtestid));
		url1.push("&uk=" + (useKey ? 1: 0));
		url1.push("&sbby=" + (submitby)); (new Image()).src = url1.join("")
	}
	function init() {
		if (!$(inputid)) {
			setTimeout(init, 50);
			return
		}
		initStyle();
		input_elem = $(inputid);
		input_form = input_elem.parentNode;
		while (input_form && input_form.tagName.toLowerCase() != "form") {
			input_form = input_form.parentNode
		}
		if (!input_form) {
			return
		}
		if (myPara.reset) {
			input_form.reset()
		}
		input_elem.setAttribute("autocomplete", "off");
		bind(input_elem, "mousedown", mousedown);
		bind(input_elem, "keydown", keydown);
		noneed_query = input_elem.value;
		checkQuery()
	}
	function mousedown() {
		if (firstRun) {
			start()
		}
		if (myPara.oms) {
			noneed_query = "";
			lastinput_query = ""
		}
		showtop = false
	}
	function positionDiv() {
		var inputBox = getPositionAndSize(useParent ? input_elem.parentNode: input_elem);
		var isIndex = (location.href.indexOf("query=") > 0) ? false: (bigsize ? false: true);
		suggDiv.style.top = (inputBox[1] + inputBox[3] + (isIndex ? -1: 0)) + "px";
		suggDiv.style.left = (inputBox[0] + (isIndex ? 0: -1)) + "px"
	}
	function getPositionAndSize(ele) {
		var x = 0,
		y = 0,
		w = ele.offsetWidth,
		h = ele.offsetHeight;
		if (ele) {
			x += ele.offsetLeft;
			y += ele.offsetTop;
			ele = ele.offsetParent
		}
		return [0, y, 578, h]
	}
	function getQuery() {
		return input_elem.value
	}
	function checkQuery() {
		if (getQuery() != noneed_query) {
			showtop = false;
			start();
			return
		}
		setTimeout(checkQuery, 10)
	}
	function checkQuery2() {
		var curr_query = getQuery();
		if (curr_query && noneed_query != curr_query && lastinput_query == curr_query) {
			if (!sending_timer) {
				sending_timer = setTimeout(function() {
					noneed_query = "";
					suggestWordId = -1;
					needData(curr_query)
				},
				100)
			}
		} else {
			clearTimeout(sending_timer);
			sending_timer = 0;
			if (!curr_query) {
				if (!showtop) {
					showTopWord()
				}
			}
			lastinput_query = curr_query
		}
		if (curr_query) {
			showtop = false
		}
		setTimeout(checkQuery2, 10)
	}
	var sctop,
	toptimer,
	showtop = false;
	function showTopWord() {
		clearTimeout(toptimer);
		if (typeof sogou_top_words == "undefined") {
			if (!sctop) {
				sctop = d.createElement("script");
				sctop.charset = "gb2312";
				sctop.src = "http://top.sogou.com/top_index.js?v=" + ((new Date()).getTime());
				d.body.appendChild(sctop)
			}
			toptimer = setTimeout(showTopWord, 50);
			return
		}
		if (!getQuery()) {
			if (!sogou_top_words.length) {
				hideDiv();
				return
			}
			showtop = true;
			userInputString = "";
			var suggList = suggDiv.getElementsByTagName("ul")[0],
			tmpLi;
			while (suggList.childNodes.length > 0) {
				suggList.removeChild(suggList.childNodes[0])
			}
			suggLis = [];
			suggOText = [];
			jsonData = sogou_top_words;
			for (var i = 0; i < jsonData.length && i < 10; i++) {
				tmpLi = d.createElement("li");
				tmpLi.style.height = "27px";
				tmpLi.onmouseover = mouseOver;
				tmpLi.onmouseout = mouseOut;
				tmpLi.onmousedown = mouseDown;
				tmpLi.onclick = mouseClick;
				tmpLi.setAttribute("lid", i);
				var tmp = jsonData[i];
				tmpLi.innerHTML = "<em class='n0' style='background:url(http://www.sogou.com/sug/images/n_" + (i + 1) + ".gif) no-repeat;'></em>" + tmp + (i == 0 ? ' <img src="http://www.sogou.com/sug/images/new2.gif" align="absmiddle" />': "");
				vrFlag[jsonData[i]] = {
					type: 0,
					tupu_key: ""
				};
				suggLis.push(tmpLi);
				suggOText.push(tmpLi.innerHTML);
				suggList.appendChild(tmpLi)
			}
			positionDiv();
			showDiv(isShowing());
			tophint.style.display = "";
			if (contentDiv) {
				contentDiv.style.display = "none";
				suggDiv.className = "suggestion nobg"
			}
		}
	}
	function needData(query) {
		if (!input_time) {
			input_time = new Date().getTime()
		}
		if (cache[query] && typeof cache[query] != "function") {
			handleData(cache[query])
		} else {
			var EEE;
			try {
				d.body.removeChild(ajaj)
			} catch(EEE) {}
			ajaj = d.createElement("script");
			ajaj.charset = "gb2312";
			ajaj.src = suggUri + "?key=" + encodeURIComponent(query) + "&type=" + sugType + "&ori=yes&pr=" + productId + "&abtestid=" + abtestid + "&ipn=" + ipn;
			d.body.appendChild(ajaj)
		}
	}
	if (typeof window.sogou != "object" || window.sogou == null) {
		window.sogou = {}
	}
	if (typeof window.sogou.sug != "undefined") {
		oldfunc = window.sogou.sug
	}
	window.sogou.sug = function(result_array) {
		try {
			oldfunc(result_array)
		} catch(E) {}
		cache[result_array[0]] = result_array;
		handleData(result_array)
	};
	if (typeof window.sogou.site != "undefined") {
		oldfunc2 = window.sogou.site
	}
	window.sogou.site = function(result_array) {
		clearTimeout(setTimer1);
		clearTimeout(setTimer2);
		clearTimeout(setTimer3);
		try {
			oldfunc2(result_array)
		} catch(E) {}
		if (result_array) {
			if (result_array.doc_num != 0) {
				handleFlag = handleRetry;
				sitecache[decodeURIComponent(result_array.query)] = result_array;
				handleSiteData(result_array)
			} else {
				var cur_query = null;
				for (var i = 0; i < suggLis.length; i++) {
					if (suggLis[i].className == "over") {
						cur_query = jsonData[i]
					}
				}
				if (handleFlag > 0 && cur_query == decodeURIComponent(result_array.query)) {
					handleFlag--;
					handleSiteData(result_array, handleFlag)
				}
			}
		}
	};
	function escapeForSpecialChars(input) {
		if (input != null) {
			return input.replace(/&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		} else {
			return ""
		}
	}
	function bold(data, input) {
		var ret = data;
		if (data.indexOf(input) == 0) {
			ret = input + "<b>" + data.substr(input.length) + "</b>"
		}
		return ret
	}
	function unbold(data) {
		return data.replace("<b>", "").replace("</b>", "")
	}
	function handleData(results) {
		if (firstRun) {
			return
		}
		if (!getQuery()) {
			return
		}
		userInputString = results[0] || userInputString;
		var showHistoryLen;
		if (window.localStorage) {
			var oqArr = getLocalStorageOq(results[0]);
			showHistoryLen = oqArr.length;
			results = JSON.parse(JSON.stringify(results));
			reorganizeResults(results, oqArr)
		}
		jsonData = results[1];
		if (results.length > 2) {
			jsonDataTongji = results[2];
			jsonDataTongji0 = [];
			jsonDataTongji1 = [];
			jsonDataTongji2 = [];
			goTongjiId = [];
			for (var k = 0; k < jsonDataTongji.length; ++k) {
				var tempTongji = jsonDataTongji[k].split(";");
				vrFlag[results[1][k]] = {
					type: tempTongji[2],
					tupu_key: results[3][k]
				};
				sugData[results[1][k]] = {
					arr2: results[2][k],
					arr3: results[3][k]
				};
				if (tempTongji != null && tempTongji.length >= 3) {
					jsonDataTongji0.push(tempTongji[0]);
					jsonDataTongji1.push(tempTongji[1]);
					jsonDataTongji2.push(tempTongji[2])
				} else {
					jsonDataTongji0.push( - 1);
					jsonDataTongji1.push(0);
					jsonDataTongji2.push("0")
				}
				goTongjiId.push(0)
			}
		}
		if (results.length > 3) {
			hasPersonal1 = results[3][0]
		}
		var i = 0,
		j;
		clearHighlight();
		highlight_li = -1;
		positionDiv();
		var show = isShowing();
		showDiv("show");
		var suggList = suggDiv.getElementsByTagName("ul")[0],
		tmpLi;
		while (suggList.childNodes.length > 0) {
			suggList.removeChild(suggList.childNodes[0])
		}
		suggLis = [];
		suggOText = [];
		for (var i = 0; i < jsonData.length && i < 10; i++) {
			tmpLi = d.createElement("li");
			if (showHistoryLen && i < showHistoryLen) {
				tmpLi.style.color = "rgb(122, 119, 200)";
				tmpLi.setAttribute("history", "1")
			}
			tmpLi.onmouseover = mouseOver;
			tmpLi.onmouseout = mouseOut;
			tmpLi.onmousedown = mouseDown;
			tmpLi.onclick = mouseClick;
			tmpLi.setAttribute("lid", i);
			tmpLi.innerHTML = bold(escapeForSpecialChars(jsonData[i]), escapeForSpecialChars(userInputString));
			if (i == 0 && jsonDataTongji2[0] == "3") {
				tmpLi.innerHTML = '<strong style="color:red">您是否要找：</strong><strong>' + tmpLi.innerHTML + "</strong>"
			}
			if (vrFlag[jsonData[i]] && (vrFlag[jsonData[i]].type == 1 || vrFlag[jsonData[i]].type == 2)) {
				tmpLi.innerHTML += "<span></span>"
			}
			suggLis.push(tmpLi);
			suggOText.push(tmpLi.innerHTML);
			suggList.appendChild(tmpLi);
			sugTemplate.prototype.cutTitle(tmpLi, tmpLi.innerHTML)
		}
		hideDiv();
		if ((jsonData.length > 0 || newPara) && on && suggLis.length > 0) {
			suggLis[0].className = "first";
			positionDiv();
			showDiv(show);
			handleFlag = handleRetry;
			selectItem(0)
		}
		if (jsonData.length == 0 || !on) {
			hideDiv()
		}
	}
	function stopEvent(evt) {
		if (evt.preventDefault) {
			evt.preventDefault()
		}
		evt.cancelBubble = true;
		return evt.returnValue = false
	}
	var useKey = false,
	submitby = "default";
	function keydown(evt) {
		evt = evt || window.event;
		if (firstRun) {
			if (evt.keyCode == 27) {
				return
			}
			start()
		}
		if (!input_time) {
			input_time = new Date().getTime()
		}
		if (evt.keyCode == 27) {
			if (isShowing()) {
				hideDiv();
				noneed_query = input_elem.value;
				setTimeout(function() {
					noneed_query = input_elem.value
				},
				1)
			}
		} else {
			if (evt.keyCode == 13) {
				hideDiv();
				submitby = "enter";
				try {
					if (input_form.enter) {
						input_form.enter.value = "1"
					}
				} catch(e) {}
				input_form.onsubmit && input_form.onsubmit() == false || timeoutSubmit();
				return stopEvent(evt)
			} else {
				if (isShowing()) {
					if (evt.keyCode == 38) {
						useKey = true;
						upKey(evt);
						return stopEvent(evt)
					} else {
						if (evt.keyCode == 9 || evt.keyCode == 40) {
							useKey = true;
							downKey(evt);
							return stopEvent(evt)
						}
					}
				} else {
					if ((evt.keyCode == 38) || (evt.keyCode == 40)) {
						useKey = true;
						getQuery() && needData(getQuery())
					}
				}
			}
		}
	}
	function timeoutSubmit() {
		if (window.localStorage) {
			setTimeout(function() {
				input_form.submit()
			},
			100)
		} else {
			input_form.submit()
		}
	}
	function trimStr(x) {
		return x.replace(/^\s+|\s+$/gm, "")
	}
	function downKey(evt) {
		if (!suggDiv.onmousemove) {
			suggDiv.onmousemove = mouseMove
		}
		isKeyTime = true;
		clearTimeout(setTimer3);
		if (needRemoveHistoryCloseIcon(suggLis[highlight_li], evt)) {
			removeHistoryCloseIcon(suggLis[highlight_li])
		}
		highlight_li++;
		if (highlight_li == Math.min(jsonData.length, 10)) {
			highlight_li = -1
		}
		highlight(evt)
	}
	function upKey(evt) {
		if (!suggDiv.onmousemove) {
			suggDiv.onmousemove = mouseMove
		}
		isKeyTime = true;
		clearTimeout(setTimer3);
		clearHighlight();
		if (needRemoveHistoryCloseIcon(suggLis[highlight_li], evt)) {
			removeHistoryCloseIcon(suggLis[highlight_li])
		}
		highlight_li--;
		if (highlight_li == -2) {
			highlight_li = Math.min(jsonData.length, 10) - 1
		}
		highlight(evt)
	}
	function highlight(evt) {
		clearHighlight();
		if (highlight_li >= 0) {
			suggLis[highlight_li].className = "over";
			input_elem.value = unbold(jsonData[highlight_li]);
			handleFlag = handleRetry;
			selectItem(highlight_li);
			if (needAddHistoryCloseIcon(suggLis[highlight_li], evt)) {
				addHistoryCloseIcon(suggLis[highlight_li])
			}
		} else {
			input_elem.value = userInputString
		}
		suggestWordId = highlight_li;
		noneed_query = input_elem.value
	}
	function listHighlight() {
		clearHighlight();
		if (highlight_li >= 0) {
			suggLis[highlight_li].className = "over"
		}
	}
	function clearHighlight() {
		for (var i = 0; i < suggLis.length; i++) {
			suggLis[i].className = ""
		}
	}
	function mouseMove() {
		suggDiv.onmousemove = null;
		isKeyTime = false;
		clearTimeout(hideTimer);
		hideTimer = setTimeout(function() {
			var li = null;
			if (mouseTime_li >= 0 && (li = suggLis[mouseTime_li])) {
				clearHighlight();
				li.className = "over";
				highlight_li = mouseTime_li;
				handleFlag = handleRetry;
				selectItem(highlight_li)
			}
			mouseTime_li = -1
		},
		50)
	}
	function mouseOut(evt) {
		evt = evt || window.event;
		if (needRemoveHistoryCloseIcon(this, evt)) {
			removeHistoryCloseIcon(this)
		}
		clearTimeout(hideTimer)
	}
	function mouseOver(evt) {
		evt = evt || window.event;
		mouseTime_li = parseInt(this.getAttribute("lid"));
		if (isKeyTime) {
			return
		}
		clearHighlight();
		this.className = "over";
		clearTimeout(setTimer3);
		clearTimeout(hideTimer);
		var needAddHisCloseIcon = needAddHistoryCloseIcon(this, evt);
		var that = this;
		hideTimer = setTimeout(function() {
			clearHighlight();
			that.className = "over";
			highlight_li = parseInt(that.getAttribute("lid"));
			handleFlag = handleRetry;
			selectItem(highlight_li);
			if (needAddHisCloseIcon) {
				addHistoryCloseIcon(that)
			}
		},
		100)
	}
	function mouseDown(event) {
		if (event && event.stopPropagation) {
			event.stopPropagation()
		}
		mousedown_ontr = 1;
		return false
	}
	function mouseClick() {
		suggestWordId = parseInt(this.getAttribute("lid"));
		input_elem.value = jsonData[suggestWordId];
		noneed_query = input_elem.value;
		hideDiv();
		submitby = "mouse";
		input_form.onsubmit && input_form.onsubmit() == false || timeoutSubmit()
	}
	function needAddHistoryCloseIcon(src, evt) {
		var e = evt.relatedTarget || evt.fromElement;
		if (!e || e.parentNode == src || e == src) {
			var aEs = src.getElementsByTagName("a");
			if (evt.keyCode != 9 && evt.keyCode != 38 && evt.keyCode != 40 && aEs.length == 1) {
				return false
			}
		}
		return true
	}
	function addHistoryCloseIcon(src) {
		if (!window.localStorage) {
			return
		}
		if (!src) {
			return
		}
		var isHistory = src.getAttribute("history");
		if (isHistory) {
			var aE = d.createElement("a");
			aE.href = "javascript:void(0);";
			aE.onclick = function(e) {
				e = e || window.event;
				stopEvent(e);
				var oq = src.textContent || src.innerText;
				removeLocalStoragePy(oq);
				if (src.parentNode.childNodes.length > 1) {
					src.parentNode.removeChild(src)
				} else {
					var x = src.parentNode.parentNode.parentNode;
					x.parentNode.removeChild(x)
				}
			};
			aE.setAttribute("class", "close");
			src.appendChild(aE)
		}
	}
	function needRemoveHistoryCloseIcon(src, evt) {
		var e = evt.relatedTarget || evt.toElement;
		if (!e || e.parentNode == src || e == src) {
			if (evt.keyCode != 9 && evt.keyCode != 38 && evt.keyCode != 40) {
				return false
			}
		}
		return true
	}
	function removeHistoryCloseIcon(src) {
		if (!window.localStorage) {
			return
		}
		if (!src) {
			return
		}
		var isHistory = src.getAttribute("history");
		if (isHistory) {
			var aEs = src.getElementsByTagName("a");
			if (aEs && aEs[0]) {
				src.removeChild(aEs[0])
			}
		}
	}
	function isShowing() {
		return (suggDiv && (suggDiv.style.display == "block"))
	}
	function showDiv(showOrNot) {
		if (!showOrNot) {
			pingback("show_s")
		}
		tophint.style.display = "none";
		suggDiv.style.display = "block";
		if (suggIfm) {
			suggIfm.style.display = "block"
		}
		try {
			if (!useParent) {
				input_elem.offsetParent.appendChild(suggDiv);
				input_elem.offsetParent.appendChild(suggIfm)
			} else {
				input_elem.parentNode.offsetParent.appendChild(suggDiv);
				input_elem.parentNode.offsetParent.appendChild(suggIfm)
			}
		} catch(e) {}
	}
	function selectItem(lino) {
		if (!vrFlag[jsonData[lino]] || vrFlag[jsonData[lino]].type == 0) {
			if (contentDiv.style.display != "none") {
				contentDiv.style.display = "none";
				suggDiv.className = "suggestion nobg";
				template.cutAllTitle(suggLis, suggOText)
			}
		} else {
			if (vrFlag[jsonData[lino]].type == 1 || vrFlag[jsonData[lino]].type == 2) {
				if (contentDiv.style.display == "none") {
					getSiteData(jsonData[lino], lino);
					template.cutAllTitle(suggLis, suggOText)
				} else {
					getSiteData(jsonData[lino], lino)
				}
			}
		}
	}
	function hideDiv() {
		suggDiv.style.display = "none";
		if (suggIfm) {
			suggIfm.style.display = "none"
		}
		try {
			if (!useParent) {
				input_elem.offsetParent.removeChild(suggDiv);
				input_elem.offsetParent.removeChild(suggIfm)
			} else {
				input_elem.parentNode.offsetParent.removeChild(suggDiv);
				input_elem.parentNode.offsetParent.removeChild(suggIfm)
			}
		} catch(e) {}
	}
	function initStyle() {
		var fileref = $c("link"),
		cssname = location.href.indexOf("query=") > 0 ? "m3": (bigsize ? "m3": "m");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", server_url + "sug/css/" + cssname + ".v.20.css");
		d.getElementsByTagName("head")[0].appendChild(fileref)
	}
	function computePersonal() {
		var num = 0;
		if (jsonDataTongji1 == null || jsonDataTongji1.length < 1) {
			return 0
		}
		for (var i = 0; i < jsonDataTongji1.length; ++i) {
			var tongji = parseInt(jsonDataTongji1[i]);
			num += tongji
		}
		return num
	}
	function start() {
		if (!firstRun) {
			return
		}
		firstRun = 0;
		noneed_query = input_elem.value;
		normalRid = normalRid || ((input_form.w && input_form.w.value) ? input_form.w.value: normalRid);
		if (suggUri.indexOf("http://") != 0) {
			suggUri = "http://" + suggUri
		}
		function clk_btn_form_submit(e) {
			e = e || window.event;
			if (e && e.type == "submit") {
				setTimeout(function() {
					input_form.onsubmit() == false || timeoutSubmit()
				},
				100);
				return false
			}
			return true
		}
		input_form.onsubmit = clk_btn_form_submit;
		var old_submit = input_form.onsubmit ||
		function() {};
		function form_submit(a, b, c) {
			if ((typeof old_submit) == "function") {
				if (old_submit(a, b, c) == false) {
					return false
				}
			}
			increaseSct();
			hasPersonal = computePersonal();
			var query_inputs = {
				w: normalRid
			};
			if (suggestWordId != -1) {
				query_inputs = {
					w: suggestRid,
					oq: userInputString,
					ri: suggestWordId,
					sourceid: "sugg"
				};
				if (jsonDataTongji.length > 0) {
					query_inputs = {
						w: suggestRid,
						oq: userInputString,
						ri: suggestWordId,
						sourceid: "sugg",
						stj: jsonDataTongji[suggestWordId],
						stj2: goTongjiId[suggestWordId],
						stj0: jsonDataTongji0[suggestWordId],
						stj1: jsonDataTongji1[suggestWordId],
						hp: hasPersonal,
						hp1: hasPersonal1
					}
				}
			}
			query_inputs.sut = (input_time ? (new Date().getTime() - input_time) : 0);
			query_inputs.sst0 = new Date().getTime();
			query_inputs.lkt = keypressNum_lead + "," + time1_lead + "," + time2_lead;
			if (showtop) {
				query_inputs.p = normalRid == "01019900" ? "40040108": "40240100"
			}
			var form_inputs = input_form.getElementsByTagName("input"),
			i,
			tmp_input;
			for (var input_name in query_inputs) {
				for (i = 0; i < form_inputs.length; i++) {
					if (form_inputs[i].getAttribute("name") == input_name) {
						form_inputs[i].value = query_inputs[input_name];
						break
					}
				}
				if (i == form_inputs.length) {
					tmp_input = d.createElement("input");
					tmp_input.type = "hidden";
					tmp_input.name = input_name;
					tmp_input.value = query_inputs[input_name];
					input_form.appendChild(tmp_input)
				}
			}
			if (window.localStorage) {
				var oq = trimStr(getQuery());
				if (oq && oq.length < 40) {
					var py = getLocalStoragePinyin(oq);
					if (py) {
						localStoragePinyin(oq, py)
					} else {
						httpRequestPinyin(oq)
					}
				}
			}
			pingback("sb");
			return true
		}
		input_form.onsubmit = form_submit;
		function createDiv() {
			if (isIe) {
				input_elem.offsetParent.style.position = "relative";
				var tmp = input_elem.offsetParent;
				while (tmp) {
					if (! (parseInt(tmp.currentStyle.zIndex))) {
						tmp.style.zIndex = "2000"
					}
					tmp = tmp.offsetParent
				}
			}
			suggDiv = $c("div", null, "suggestion nobg");
			suggDiv.id = "vl";
			var tmpLi,
			innerDiv = $c("div", suggDiv, "suginner"),
			tt = $c("p", innerDiv, "s_title"),
			suggList = $c("ul", innerDiv, "suglist");
			tophint = tt;
			tophint.innerHTML = "今日热词";
			tophint.style.display = "none";
			tophint.style.margin = "0";
			suggLis = [];
			for (var i = 0; i < 10; i++) {
				tmpLi = d.createElement("li");
				tmpLi.onmouseover = mouseOver;
				tmpLi.onmouseout = mouseOut;
				tmpLi.onmousedown = mouseDown;
				tmpLi.onclick = mouseClick;
				tmpLi.setAttribute("lid", i);
				suggLis.push(tmpLi);
				suggList.appendChild(tmpLi)
			}
			contentDiv = $c("div", innerDiv, "sugc");
			contentDiv.id = "sugc";
			contentDiv.onmouseover = function() {
				mouseTime_li = -1
			};
			contentDiv.style.display = "none";
			suggList.onmouseout = listHighlight
		}
		createDiv();
		bind(d, "click",
		function(evt) {
			evt = evt || window.event;
			var ele = evt.srcElement || evt.target;
			while (ele) {
				if (ele == contentDiv || ele == input_elem) {
					return
				}
				ele = ele.parentNode
			}
			hideDiv()
		});
		bind(input_elem, "beforedeactivate",
		function() {
			if (mousedown_ontr) {
				window.event.cancelBubble = true;
				window.event.returnValue = false;
				mousedown_ontr = 0
			}
		});
		checkQuery2()
	}
	function getCookie() {
		var dc = d.cookie;
		var prefix = "sct=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) {
				return null
			}
		} else {
			begin += 2
		}
		var end = dc.indexOf(";", begin);
		if (end == -1) {
			end = dc.length
		}
		return dc.substring(begin + prefix.length, end)
	}
	function increaseSct() {
		var sct = parseInt(getCookie() || 0) || 0;
		document.cookie = "sct=" + (sct + 1) + "; expires=Thu, 21-Jul-2020 00:00:00 GMT; path=/;domain=sogou.com;"
	}
	var oldclick = d.onclick ||
	function() {};
	d.onclick = function(evt) {
		var ret = oldclick(evt);
		page_click(evt);
		return ret
	};
	function page_click(evt) {
		if ((evt && (evt.button != 0)) || ((!evt) && (window.event.button != 0))) {
			return
		}
		evt = evt || window.event;
		var srcElem = ((evt.target) ? evt.target: evt.srcElement),
		h;
		while (srcElem && srcElem.tagName) {
			if (srcElem.tagName.toUpperCase() == "A") {
				h = srcElem.href || "";
				if (h.indexOf("http://www.sogou.com/") == 0 && h.indexOf("query=") > 0) {
					increaseSct()
				}
				return
			}
			srcElem = srcElem.parentNode
		}
	}
	function getSiteData(txt, pos, cnt) {
		contentDiv.style.display = "";
		suggDiv.className = "suggestion";
		txt = unbold(txt || "");
		cnt = cnt || 0;
		if (!txt) {
			return
		}
		if (contentDiv) {
			if (cnt == 0) {
				contentDiv.innerHTML = ""
			}
		}
		if (sitecache[txt]) {
			handleSiteData(sitecache[txt])
		} else {
			var type = vrFlag[txt].type == 2 ? 1: 0;
			txt = encodeURIComponent(txt);
			try {
				d.body.removeChild(ajaj2)
			} catch(EEE) {}
			ajaj2 = d.createElement("script");
			var iploc = null;
			if (document.cookie.length > 0 && document.cookie.indexOf("IPLOC=") >= 0) {
				var c_start = document.cookie.indexOf("IPLOC=") + 6,
				c_end = document.cookie.indexOf(";", c_start) == -1 ? document.cookie.length: document.cookie.indexOf(";", c_start);
				iploc = document.cookie.substring(c_start, c_end)
			}
			if (!/CN[0-9]{4,6}/.exec(iploc)) {
				iploc = "CN110000"
			}
			while (iploc.legnth < 6) {
				iploc += "0"
			}
			ajaj2.charset = "gb2312";
			ajaj2.src = ["http://go.sugg.sogou.com/", txt, "?", (new Date().getTime()), "&rid=", (txt.toLowerCase().charCodeAt(txt.length - 1) % 6), "&IPLOC=", iploc, "&type=", type].join("");
			clearTimeout(setTimer2);
			setTimer2 = setTimeout(function() {
				contentDiv.innerHTML = '<div class="loading">正在载入，请稍后...</div>'
			},
			100);
			clearTimeout(setTimer1);
			setTimer1 = setTimeout(function() {
				if (cnt < MAX_RETRY_FETCH_SITE - 1) {
					txt = decodeURIComponent(txt);
					getSiteData(txt, pos, cnt + 1)
				} else {
					template.pv(txt, -999, pos, 0)
				}
			},
			500);
			d.body.appendChild(ajaj2)
		}
	}
	function httpRequestPinyin(oq) {
		ajajPinyin = d.createElement("script");
		ajajPinyin.charset = "gb2312";
		ajajPinyin.src = "http://w.sugg.sogou.com/sugg/ajaj_json.jsp?type=getpinyin&key=" + encodeURIComponent(oq);
		d.body.appendChild(ajajPinyin)
	}
	function sleep(milliSeconds) {
		var start = +new Date();
		while (true) {
			if (( + new Date()) - start > milliSeconds) {
				break
			}
		}
	}
	window.sogou.sugpy = function(result_array) {
		var key = result_array[0];
		var val = result_array[1][0];
		localStoragePinyin(key, val)
	};
	function getLocalStorageOq(str) {
		var str = trimStr(str);
		if (!str || !localStorage.sogouSearchSugPinyin) {
			return false
		}
		var oqArr = [];
		var pinyinJsonArr = JSON.parse(localStorage.sogouSearchSugPinyin);
		for (var i = pinyinJsonArr.length - 1; i > -1; i--) {
			var pinyinJson = pinyinJsonArr[i];
			if (pinyinJson.py.indexOf(str) == 0) {
				oqArr.push(pinyinJson)
			} else {
				if (pinyinJson.oq.indexOf(str) == 0) {
					oqArr.push(pinyinJson)
				}
			}
			if (oqArr.length > 1) {
				break
			}
		}
		return oqArr
	}
	function reorganizeResults(results, history) {
		if (!history || history.length == 0) {
			return results
		}
		var nature = results[1];
		var jdTongji = results[2];
		var psTongji = results[3];
		for (var i = 0; i < nature.length; i++) {
			var n = nature[i];
			var isDuplicate = false;
			for (var j = 0; j < history.length; j++) {
				var h = history[j];
				if (n == h.oq) {
					isDuplicate = true;
					nature.splice(i, 1);
					jdTongji.splice(i, 1);
					psTongji.splice(i, 1);
					i--;
					break
				}
			}
		}
		for (var k = history.length - 1; k >= 0; k--) {
			var h = history[k];
			nature.unshift(h.oq);
			jdTongji.unshift(h.arr2);
			psTongji.unshift(h.arr3)
		}
		while (nature.length > 10) {
			nature.pop();
			jdTongji.pop();
			psTongji.pop()
		}
	}
	function getLocalStoragePinyin(oq) {
		try {
			if (!oq || !localStorage.sogouSearchSugPinyin) {
				return false
			}
			var pinyinJsonArr = JSON.parse(localStorage.sogouSearchSugPinyin);
			for (var i = 0; i < pinyinJsonArr.length; i++) {
				var tmp = pinyinJsonArr[i];
				if (tmp.oq == oq) {
					return tmp.py
				}
			}
			return false
		} catch(i) {}
	}
	function localStoragePinyin(oq, py) {
		if (!oq || !py) {
			return false
		}
		var pinyinJsonArr,
		pinyinJson = {};
		if (!localStorage.sogouSearchSugPinyin) {
			pinyinJsonArr = []
		} else {
			pinyinJsonArr = JSON.parse(localStorage.sogouSearchSugPinyin)
		}
		for (var i = 0; i < pinyinJsonArr.length; i++) {
			var pj = pinyinJsonArr[i];
			if (pj.oq == oq) {
				pinyinJsonArr.splice(i, 1)
			}
		}
		pinyinJson.oq = oq;
		pinyinJson.py = py;
		var sugOriginData = sugData[oq];
		pinyinJson.arr2 = sugOriginData ? sugOriginData.arr2: "0;0;0;0";
		pinyinJson.arr3 = sugOriginData ? sugOriginData.arr3: "";
		pinyinJsonArr.push(pinyinJson);
		while (pinyinJsonArr.length > 100) {
			pinyinJsonArr.shift()
		}
		localStorage.sogouSearchSugPinyin = JSON.stringify(pinyinJsonArr);
		return true
	}
	function removeLocalStoragePy(oq) {
		var oq = trimStr(oq);
		if (!oq || !localStorage.sogouSearchSugPinyin) {
			return false
		}
		var pinyinJsonArr = JSON.parse(localStorage.sogouSearchSugPinyin);
		for (var i = 0; i < pinyinJsonArr.length; i++) {
			var pj = pinyinJsonArr[i];
			if (pj.oq == oq) {
				pinyinJsonArr.splice(i, 1);
				break
			}
		}
		localStorage.sogouSearchSugPinyin = JSON.stringify(pinyinJsonArr);
		return true
	}
	function handleSiteData(data, cnt) {
		cnt = cnt || 0;
		if (contentDiv) {
			if (cnt == 0) {
				contentDiv.innerHTML = ""
			}
			if (!template.build(contentDiv, data, jsonData, goTongjiId, vrFlag)) {
				if (contentDiv.innerHTML != '<div class="loading">正在载入，请稍后...</div>') {
					contentDiv.innerHTML = '<div class="loading">正在载入，请稍后...</div>'
				}
				clearTimeout(setTimer1);
				clearTimeout(setTimer3);
				if (data.query) {
					for (var i = 0; i < jsonData.length; i++) {
						if (jsonData[i] == decodeURIComponent(data.query)) {
							pos = i;
							break
						}
					}
					setTimer3 = setTimeout(function() {
						getSiteData(decodeURIComponent(data.query), pos, MAX_RETRY_FETCH_SITE - 1)
					},
					500)
				}
			}
		}
	}
	template.getSiteData = getSiteData;
	init();
	sugTemplate.prototype.buildZhiDa = function(div, context, tempCode) {
		var loopPtn = /<!--\s*LOOP\s+SET=\$\{(.*?)\}.*?-->/,
		endPtn = /<!--\s*ENDLOOP\s*-->/,
		loopMat = null,
		endMat = null;
		while (loopMat = loopPtn.exec(tempCode)) {
			var leftContent = RegExp.leftContext;
			var setCode = loopMat[1];
			endMat = endPtn.exec(tempCode);
			var rightContent = RegExp.rightContext;
			var loopCode = tempCode.substring(loopMat.index + loopMat[0].length, endMat.index);
			var loopContent = "";
			with(context) {
				var setVar = eval(setCode)
			}
			for (var i in setVar) {
				var item = setVar[i];
				context.item = item;
				context.i = i;
				loopContent += this.replaceZhidaTemp(loopCode, context)
			}
			tempCode = leftContent + loopContent + rightContent
		}
		div.innerHTML = this.replaceZhidaTemp(tempCode, context)
	};
	sugTemplate.prototype.replaceZhidaTemp = function(code, context) {
		var varPtn = /\$\{(.*?)\}|\$%7B(.*?)%7D/g;
		var varMat = null;
		var head = 0,
		tail = 0;
		var k = 0;
		var content = "";
		while (varMat = varPtn.exec(code)) {
			tail = varMat.index;
			content += code.substring(head, tail);
			with(context) {
				content += eval((varMat[1] ? varMat[1] : varMat[2]))
			}
			head = tail + varMat[0].length
		}
		content += code.substring(head, code.length);
		return content
	}
}
var smugg = new sogouSugg();
function sugg_go_imgresize(f, c, b) {
	var a = f.width || 0;
	var d = f.height || 0;
	var j = false;
	if (a == 0 || d == 0) {
		j = true;
		var g = f.cloneNode(true);
		g.style.visibility = "hidden";
		document.body.appendChild(g);
		a = g.width;
		d = g.height;
		document.body.removeChild(g)
	}
	if (a > c && d > b) {
		if (a / d <= c / b) {
			f.style.width = c + "px";
			f.style.height = "auto"
		} else {
			f.style.height = b + "px";
			f.style.width = "auto"
		}
	}
}
var keypressNum_lead = 0,
time1_lead = 0,
time2_lead = 0; (function() {
	var g = "browerV";
	var m = "osV";
	var l = (function() {
		var n = window.navigator.userAgent.toLowerCase();
		var p = {};
		if (window.opera) {
			p.opera = true
		} else {
			if (n.indexOf("msie") != -1) {
				p.ie = true;
				var o = /msie\s+(.)/.exec(n);
				if (o) {
					p["ie" + o[1]] = true
				}
			} else {
				if (n.indexOf("webkit") != -1) {
					p.webkit = true;
					if (n.indexOf("chrome") != -1) {
						p.chrome = true
					} else {
						if (n.indexOf("ipad") != -1) {
							p.ipad = true;
							p.ios = true
						} else {
							if (n.indexOf("safari") != -1) {
								p.safari = true
							}
						}
					}
				} else {
					if (n.indexOf("gecko") != -1) {
						p.gecko = true;
						if (n.indexOf("firefox") != -1) {
							p.firefox = true
						}
					} else {
						if (window.openDatabase) {
							p.safari = true
						}
					}
				}
			}
		}
		if (n.indexOf("se 2.x") != -1) {
			p.se = true
		}
		if (n.indexOf("360ee") != -1) {
			p.s60ee = true
		} else {
			if (n.indexOf("360se") != -1) {
				p.s60se = true
			} else {
				if (n.indexOf("aoyou") != -1 || n.indexOf("maxthon") != -1) {
					p.aoyou = true
				} else {
					if (n.indexOf("theworld") != -1) {
						p.world = true
					} else {
						if (n.indexOf("worldchrome") != -1) {
							p.worldchrome = true
						} else {
							if (n.indexOf("greenbrowser") != -1) {
								p.greenbrowser = true
							} else {
								if (n.indexOf("qqbrowser") != -1) {
									p.qqbrowser = true
								} else {
									if (n.indexOf("baidu") != -1 || n.indexOf("bidu") != -1) {
										p.baidu = true
									} else {
										if (n.indexOf("ucweb") != -1) {
											p.ucweb = true
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return p
	})();
	var b = (function() {
		var o = window.navigator.userAgent.toLowerCase();
		var n = {};
		if (o.indexOf("windows") != -1) {
			n.window = true
		} else {
			if (o.indexOf("mac") != -1) {
				n.mac = true
			} else {
				if (o.indexOf("linux") != -1) {
					n.linux = true
				} else {
					if (o.indexOf("x11") != -1) {
						n.unix = true
					} else {
						if (o.indexOf("solaris") != -1) {
							n.solaris = true
						}
					}
				}
			}
		}
		if ( !! o.match(/AppleWebKit.*Mobile.*/) || !!o.match(/AppleWebKit/)) {
			n.mobile = true
		} else {
			if (o.indexOf("ios") != -1) {
				n.mobile = true
			} else {
				if (o.indexOf("ipad") != -1) {
					n.ipad = true
				} else {
					if (o.indexOf("android") != -1) {
						n.android = true
					} else {
						if (o.indexOf("iphone") != -1) {
							n.iphone = true
						}
					}
				}
			}
		}
		return n
	})();
	function a() {
		var q = h(g);
		var p = h(m);
		var o,
		n;
		o = c(l);
		k(g, o, 365 * 24 * 3600 * 30, "/", "www.sogou.com", "");
		n = j(b);
		k(m, n, 365 * 24 * 3600 * 30, "/", "www.sogou.com", "")
	}
	function c(n) {
		if (n) {
			if (n.s60ee) {
				return 6
			}
			if (n.s60se) {
				return 7
			}
			if (n.aoyou) {
				return 9
			}
			if (n.world) {
				return 10
			}
			if (n.worldchrome) {
				return 11
			}
			if (n.greenbrowser) {
				return 12
			}
			if (n.qqbrowser) {
				return 13
			}
			if (n.baidu) {
				return 14
			}
			if (n.se) {
				return 8
			}
			if (n.opera) {
				return 4
			}
			if (n.chrome) {
				return 3
			}
			if (n.safari) {
				return 5
			}
			if (n.ie) {
				return 1
			}
			if (n.firefox) {
				return 2
			}
		}
		return 0
	}
	function j(n) {
		if (n) {
			if (n.mobile) {
				return 6
			}
			if (n.android) {
				return 7
			}
			if (n.iphone) {
				return 8
			}
			if (n.ipad) {
				return 9
			}
			if (n.window) {
				return 1
			}
			if (n.linux) {
				return 3
			}
			if (n.solaris) {
				return 4
			}
			if (n.unix) {
				return 5
			}
			if (n.mac) {
				return 2
			}
		}
		return 0
	}
	function k(p, r, n, u, q, t) {
		var o = new Date();
		o.setTime(o.getTime());
		var s = new Date(o.getTime() + (n));
		document.cookie = p + "=" + (r) + ((n) ? "; expires=" + s.toGMTString() : "") + ((u) ? "; path=" + u: "") + ((q) ? "; domain=" + q: "") + ((t) ? "; secure": "")
	}
	function h(p) {
		var o = document.cookie;
		var r = p + "=";
		var q = o.indexOf("; " + r);
		if (q == -1) {
			q = o.indexOf(r);
			if (q != 0) {
				return null
			}
		} else {
			q += 2
		}
		var n = document.cookie.indexOf(";", q);
		if (n == -1) {
			n = o.length
		}
		return unescape(o.substring(q + r.length, n))
	}
	a();
	var f = document.getElementsByTagName("input");
	for (var d in f) {
		for (i = 0; i < f.length; i++) {
			if (f[i].name == "query") {
				f[i].onkeypress = function() {
					keypressNum_lead++;
					if (time1_lead == 0) {
						time1_lead = new Date().getTime()
					}
					time2_lead = new Date().getTime()
				}
			}
		}
	}
})();