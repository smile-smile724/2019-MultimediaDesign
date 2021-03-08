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
    if(content=="HuangJ"){
        $("#car").css("left","53%");
        $("#car").css("top","21%");
    }else if(content=="wan_y"){
        $("#car").css("left","67%");
        $("#car").css("top","53%");
    }else if(content=="ZhuZ"){
        $("#car").css("left","54%");
        $("#car").css("top","65%");
    }else{
        $("#car").css("left","53%");
        $("#car").css("top","21%");
    }
    var Incontent;
    $(".map_location .map_pic").click(function(){
        Incontent= $(this).attr('id');
        source = "Skill";
        if(Incontent=="HuangJ"){
            $("#car").css("left","53%");
            $("#car").css("top","21%");
        }else if(Incontent=="wan_y"){
            $("#car").css("left","67%");
            $("#car").css("top","53%");
        }else if(Incontent=="ZhuZ"){
            $("#car").css("left","54%");
            $("#car").css("top","65%");
        }
        if(!content&&Incontent=="HuangJ"){
            url = "/ppt?content=HuangJ&source=Skill";//此处拼接内容
            window.location.href = url;
        }
    });
    var car = document.getElementById("car");
    car.addEventListener("transitionend",function(){
        url = "/ppt?content="+Incontent+"&source="+source+"&slide=0";//此处拼接内容
        window.location.href = url;
    })
})