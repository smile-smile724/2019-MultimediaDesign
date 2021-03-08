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
    if(content=="HangZ"){
        $("#car").css("left","41%");
        $("#car").css("top","13%");
    }else if(content=="XuF"){
        $("#car").css("left","70%");
        $("#car").css("top","20%");
    }else if(content=="WuX"){
        $("#car").css("left","55%");
        $("#car").css("top","28%");
    }else{
        $("#car").css("left","41%");
        $("#car").css("top","15%");
    }
    $(".map_location .map_pic").click(function(){
        content= $(this).attr('id');
        source = "Story";
        if(content=="HangZ"){
            $("#car").css("left","41%");
            $("#car").css("top","13%");
            url = "/storygame?content="+content+"&source="+source;//此处拼接内容
            window.location.href = url;
        }else if(content=="XuF"){
            $("#car").css("left","70%");
            $("#car").css("top","20%");
        }else if(content=="WuX"){
            $("#car").css("left","55%");
            $("#car").css("top","28%");
        }
    });
    var car = document.getElementById("car");
    car.addEventListener("transitionend",function(){
        if(content=="HangZ"){
            url = "/storygame?content="+content+"&source="+source;//此处拼接内容
            window.location.href = url;
        }
    })
})