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
    
    console.log(str);
    console.log(str.length);

/*    for (var i in str){
            if (typeof(str[i])!='object'&&str[i]!=''&&str[i]!='0') {
                var htmlStr= str[i];
                cHtml();
            }else{
                //for (var i = 0; i < str[1].length; i++) {
                    var htmlStr = str[1][i];
                    cHtml();

                //};
            }
        }*/

    for (var i = 0; i < str[1].length; i++) {
        var htmlStr = str[1][i];
        cHtml();
    };
    
}

var otext = $("#submit");
otext.on('click',function(){

    var inputKey = $('.query').val();
    if (inputKey=="") {
        $('.query').addClass('redborder');
    }else{


        var script=null;
        url='http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key='+ inputKey +'&type=wxpub&ori=yes&pr=web&abtestid=&ipn=';
            
        if(script){
            document.body.removeChild(script);
        }else{
            script=document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }

    }
    
});
