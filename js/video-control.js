$(document).ready(function(){
    var name=new Array(),
    value=new Array();
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    function UrlSearch() {
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
     
        var arr=str.split("&"); //各个参数放到数组里
         console.log(arr)
        for(var i=0;i < arr.length;i++){
             num=arr[i].indexOf("=");
             if(num>0){
                  name[i]=arr[i].substring(0,num);
                  value[i]=arr[i].substr(num+1);
                  this[name[i]]=value[i];
                  console.log(name[i]+"="+value[i]);
             }
        }
     }
     UrlSearch();
     var content = value[0];
    //  alert(content);
    var source = value[1];
    // alert(source);
    $("#back").click(function(){
        url = "/ppt?content="+content+"&source="+source;//此处拼接内容
        window.location.href = url;
    });

    //视频内容
    if(content=="wan_y"){
        $("#video").attr("src","img/碗窑.mp4");
        $("#video").attr("poster","img/碗窑loading.png");
        $("#video").play();
    }else if(content=="ZhuZ"){
        $("#video").attr("src","img/竹纸视频.mp4");
        $("#video").attr("poster","img/竹纸loading.png");
        $("#video").play();
    }
})