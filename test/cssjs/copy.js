function cutLength(){
	console.log('cutLength');
}
function uigs_para(){
	console.log('uigs_para');
}
function vrTimeHandle552write (){
	console.log('vrTimeHandle552write ');
}
function len (){
	console.log('len ');
}
function vrImgLoad (){
	console.log('vrImgLoad ');
}
function vrImgLoad (){
	console.log('vrImgLoad ');
}
function vrImgLoad (){
	console.log('vrImgLoad ');
}

/*来自 http://weixin.sogou.com/js/pb.nogz.js*/
/*相关 http://weixin.sogou.com/js/sugg_new.v.28.js*/
/*
//var sogou_last_mousedown_time = 0;
function sogou_uigs(){
	var paras = uigs_para, $d = document;
	function getNowTime(){
		return (new Date()).getTime();
	}
	function getRandom(){
		return (getNowTime())*1000+Math.round(Math.random()*1000)
	}	

	if(typeof(uigs_para)=="undefined" || !uigs_para.uigs_productid){
		window.uigs2PB = function(){}
		return;
	}

	function getFromPara(pname, defaultV, isNum){
		if (typeof paras[pname] == "undefined"){
			return defaultV;
		}
		if (isNum){
			return parseInt(paras[pname]);
		}
		return paras[pname];

	}
	
	//defined variables
	var UIGS_HEAD="http://pb.sogou.com/", UIGS_CL="cl.gif", UIGS_PV="pv.gif", UIGS_VER="v2.0",
	START_TIME=getNowTime(),
	uigs_pvlink = getFromPara("uigs_pvpingbackurl", UIGS_HEAD+UIGS_PV), //pv pingback address
	uigs_cllink = getFromPara("uigs_clpingbackurl", UIGS_HEAD+UIGS_CL), //cl pingback address
	uigs_uuid   = getFromPara("uigs_uuid", getRandom()),
	uigs_cookie = getFromPara("uigs_cookie", "").split(","),
	uigs_pbtag  = getFromPara("uigs_pbtag", "A"),
	uigs_head = null, i,
	sogou_mousemove_distance = 0,
	empty_func = function(){},
	oldclick = $d.onclick||empty_func,
	sogou_old_document_mousedown = $d.onmousedown||empty_func,
	sogou_old_document_mousemove = $d.onmousemove||empty_func,	
	getstop = function(){return (($d.body && $d.body.scrollTop) || ($d.documentElement && $d.documentElement.scrollTop) || 0)},
	docEl= (($d.compatMode && $d.compatMode!="BackCompat")? $d.documentElement:$d.body), pingbackarray={}, pingbackarrayidx=0;


	//lib
	function getCookie(name) {
		var dc = $d.cookie, prefix = name + "=", begin = dc.indexOf("; " + prefix);
		if(begin == -1){
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		}
		else{
			begin += 2;
		}
		var end = $d.cookie.indexOf(";", begin);
		if (end == -1) {
			end = dc.length;
		}
		return dc.substring(begin + prefix.length, end);
	}

	function uigs_encode(a){
		return (typeof(encodeURIComponent)=='function')?encodeURIComponent(a):escape(a);
	}

	function getAttr(elem, attr){
		var ret;
		if (elem){
			ret = elem[attr];
			if (elem.getAttribute){
				ret = ret||elem.getAttribute(attr);
			}
		}
		return ret||"";
	}
	//get uigs header
	function build_header(){
		if (!uigs_head){
			uigs_head = ["uigs_productid="+paras.uigs_productid];//["uigs_productid=webapp&type=nuigs"];//
			uigs_head.push("uigs_uuid="+uigs_uuid);
			uigs_head.push("uigs_version="+UIGS_VER);
			uigs_head.push("uigs_refer="+uigs_encode($d.referrer||""));

			var tmp = [], cookieV;
			for (i = 0; i < uigs_cookie.length; i++){
				if (uigs_cookie[i] && uigs_cookie[i] != "SUV"){
					cookieV = getCookie(uigs_cookie[i]);
					if (cookieV != null){
						tmp.push(uigs_cookie[i]+"="+cookieV);
					}
				}
			}
			uigs_head.push("uigs_cookie="+uigs_encode(tmp.join("&")));
			uigs_head = uigs_head.join("&");
		}
		var all_paras=[];
		for (i in paras){
			if (typeof paras[i] != "function" && i != "uigs_productid" && i != "uigs_uuid" && i != "uigs_cookie"){
				all_paras.push(uigs_encode(i)+"="+uigs_encode(paras[i]));
			}
		}
		all_paras.push("xy="+docEl.clientWidth+','+docEl.clientHeight);

		return ["?",uigs_head,"&",all_paras.join("&"),"&uigs_t=",getRandom()].join("");
	}


	//send pingback
	function uigs_pingback(pbStr, isPv){
		var pbsrc = [(isPv?uigs_pvlink:uigs_cllink),build_header(),pbStr||""].join(""), tmp = new Image(), idx = pingbackarrayidx;
		pingbackarray[idx] = tmp;
		pingbackarrayidx++;
		tmp.onload=tmp.onerror=tmp.onabout=function(){try{delete pingbackarray[idx]}catch(E){}};
		tmp.src = pbsrc;
	}

	//uigs pv
	function uigs_pv(){
		if(!getCookie("SUV")){
			$d.cookie="SUV="+getRandom()+";path=/;expires=Tue, 19-Jan-2046 00:00:00 GMT;domain=sogou.com"
		}
		uigs_pingback("", true);
	}
	
	//uigs click
	function uigs_click(evt){
		if ((evt&&(evt.button != 0))||((!evt)&&(window.event.button != 0))){
			return;  // not left click
		}

		try{
			evt=evt||window.event;
			var srcElem=((evt.target)?evt.target:evt.srcElement), uigsflag, tag, dHref, dTxt, tmp;

			while(srcElem && srcElem.tagName){
				//get tagname
				tag = srcElem.tagName.toUpperCase();

				//there is some element you dont want to send click pingback, then add attribute uigs="nouigs"
				uigsflag = getAttr(srcElem, "uigs")||uigsflag||"";

				if(uigsflag=='nouigs'){
					//dont send
					return;
				}

				dHref = dHref||srcElem.href||"";
				tmp = getAttr(srcElem, "uigs_txt"); //txt can be a's innerHTML or any elemnt's uigs_txt
				if (tag == "A" || tmp){
					dTxt = tmp||dTxt||srcElem.innerHTML;
				}

				if (uigsflag && uigsflag != 'id'){ //uigs=="id" means use id
					break;
				}

				if(tag==uigs_pbtag){
					uigsflag = 'id'; //means use id
				}
				
				if (uigsflag == "id" && getAttr(srcElem, "id")){
					uigsflag = getAttr(srcElem, "id"); // try to get id from it or its parent node
					break;
				}

				srcElem = srcElem.parentNode;
			}
			
			if (uigsflag && uigsflag != "id"){
				uigs2PB(uigsflag+"&href="+dHref, (dTxt||"").replace(/<.*?>/g, ""));
			}
		}
		catch(E){
			alert(E);
		}
	}

	//uigs pb
	window.uigs2PB = function(uigs_cl, txt){
		var cl_pbstr = ["",
										"uigs_st="+parseInt((getNowTime()-START_TIME)/1000),
				 						"uigs_cl="+uigs_encode(uigs_cl)];
		if (txt){
			cl_pbstr.push("txt="+uigs_encode(txt));
		}
		
		uigs_pingback(cl_pbstr.join("&"));
	}


	//send pv pingback
	if(typeof(uigs2_pv)=="undefined"){
		window.uigs2_pv = 1;
		uigs_pv();
	}

	//bind click
	$d.onclick = function(evt){
		var ret = oldclick(evt);
		//paras['mmc']=(getNowTime() - sogou_last_mousedown_time);
		uigs_click(evt);
		return ret;
	}

	

}
sogou_uigs();
*/