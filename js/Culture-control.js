$(function(){
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
    if(content=="DuS"){
        $("#car").css("left","35%");
        $("#car").css("top","16%");
    }else if(content=="wan_yc"){
        $("#car").css("left","61%");
        $("#car").css("top","48%");
    }else if(content=="NanGeG"){
        $("#car").css("left","26%");
        $("#car").css("top","63%");
    }else{
        $("#car").css("left","35%");
        $("#car").css("top","16%");
    }
    var Incontent;
    $(".map_location .map_pic").click(function(){
        Incontent= $(this).attr('id');
        source = "Culture";
        if(Incontent=="DuS"){
            $("#car").css("left","35%");
            $("#car").css("top","16%");
        }else if(Incontent=="wan_yc"){
            $("#car").css("left","61%");
            $("#car").css("top","48%");
        }else if(Incontent=="NanGeG"){
            $("#car").css("left","26%");
            $("#car").css("top","63%");
        }
        if(!content&&Incontent=="DuS"){
            url = "/culture?content=DuS&source=Culture";//此处拼接内容
            window.location.href = url;
        }
    });
    var car = document.getElementById("car");
    car.addEventListener("transitionend",function(){
        url = "/culture?content="+Incontent+"&source="+source;//此处拼接内容
        window.location.href = url;
    })
})