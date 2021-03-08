$(function(){
    var name=new Array(),
    value=new Array();
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?");
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
    //  alert(source=="Culture");
    //判断是传统技艺还是传统文化，控制视频播放的有无
    if(source=="Skill"){
        //如果是传统技艺
        $('.video-btn').css("display","block");
        $(".video-btn").click(function(){
            url = "/video?content="+content+"&source="+source;//此处拼接内容
            window.location.href = url;
        });
        //游戏体验
        $(".game-btn").click(function(){
            if(content=="wan_y"){
                url = "/wanyaogame?content="+content+"&source="+source;//此处拼接内容
                window.location.href = url;
            }else if(content=="ZhuZ"){
                url = "/step01?content="+content+"&source="+source;//此处拼接内容
                window.location.href = url;
            }
        });
        $("#back").click(function(){
            url = "/skills_map?content="+content;//此处拼接内容
            window.location.href = url;
        });

        //ppt内容
        if(content=="HuangJ"){
            $("#slide-1").attr("src","img/HuangJ-1.png");
            $("#slide-2").attr("src","img/HuangJ-2.png");
            $("#slide-3").attr("src","img/HuangJ-3.png");
            $("#slide-4").attr("src","img/HuangJ-4.png");
            $("#slide-5").attr("src","img/HuangJ-5.png");
            $("#slide-6").attr("src","img/HuangJ-6.png");
            $("#slide-7").attr("src","img/HuangJ-7.png");
            $("#slide-8").attr("src","img/HuangJ-8.png");
            $("#slide-9").attr("src","img/HuangJ-9.png");
            $("#slide-10").attr("src","img/HuangJ-10.png");
            $('.game-btn').css("display","none");
            $('.video-btn').css("display","none");
        }else if(content=="ZhuZ"){
            $("#slide-1").attr("src","img/ZhuZ-1.png");
            $("#slide-2").attr("src","img/ZhuZ-2.png");
            $("#slide-3").attr("src","img/ZhuZ-3.png");
            $("#slide-4").attr("src","img/ZhuZ-4.png");
            $("#slide-5").attr("src","img/ZhuZ-5.png");
            $("#slide-6").attr("src","img/ZhuZ-6.png");
            $("#slide-7").attr("src","img/ZhuZ-7.png");
            $("#slide-8").attr("src","img/ZhuZ-8.png");
            $("#slide-9").attr("src","img/ZhuZ-9.png");
            $("#slide-10").attr("src","img/ZhuZ-10.png");
        }else if(content=="wan_y"){
            $("#slide-1").attr("src","img/wan_y-1.png");
            $("#slide-2").attr("src","img/wan_y-2.png");
            $("#slide-3").attr("src","img/wan_y-3.png");
            $("#slide-4").attr("src","img/wan_y-4.png");
            $("#slide-5").attr("src","img/wan_y-5.png");
            $("#slide-6").attr("src","img/wan_y-6.png");
            $("#slide-7").attr("src","img/wan_y-7.png");
            $("#slide-8").attr("src","img/wan_y-8.png");
            $("#slide-9").attr("src","img/wan_y-9.png");
            $("#slide-10").attr("src","img/wan_y-10.png");
        }
    }else if(source=="Culture"){
        //如果是传统文化
        $('.video-btn').css("display","none");
        $("#back").click(function(){
            url = "/culture?content="+content+"&source="+source;//此处拼接内容
            window.location.href = url;
        });
        //ppt内容
        if(content=="DuS"){
            $("#slide-1").attr("src","img/DuS-1.png");
            $("#slide-2").attr("src","img/DuS-2.png");
            $("#slide-3").attr("src","img/DuS-3.png");
            $("#slide-4").attr("src","img/DuS-4.png");
            $("#slide-5").attr("src","img/DuS-5.png");
            $("#slide-6").attr("src","img/DuS-6.png");
            $("#slide-7").attr("src","img/DuS-7.png");
            $("#slide-8").attr("src","img/DuS-8.png");
            $("#slide-9").attr("src","img/DuS-9.png");
            $("#slide-10").attr("src","img/DuS-10.png");
            $(".game-btn").click(function(){
                url = "/culturegame?content="+content+"&source="+source;//此处拼接内容
                window.location.href = url;
            });
        }else if(content=="NanGeG"){
            $("#slide-1").attr("src","img/NanGeG-1.png");
            $("#slide-2").attr("src","img/NanGeG-2.png");
            $("#slide-3").attr("src","img/NanGeG-3.png");
            $("#slide-4").attr("src","img/NanGeG-4.png");
            $("#slide-5").attr("src","img/NanGeG-5.png");
            $("#slide-6").attr("src","img/NanGeG-6.png");
            $("#slide-7").attr("src","img/NanGeG-7.png");
            $("#slide-8").attr("src","img/NanGeG-8.png");
            $("#slide-9").attr("src","img/NanGeG-9.png");
            $("#slide-10").attr("src","img/NanGeG-10.png");
            $('.game-btn').css("display","none");
        }else if(content=="wan_yc"){
            $("#slide-1").attr("src","img/Wan_yc-1.png");
            $("#slide-2").attr("src","img/Wan_yc-2.png");
            $("#slide-3").attr("src","img/Wan_yc-3.png");
            $("#slide-4").attr("src","img/Wan_yc-4.png");
            $("#slide-5").attr("src","img/Wan_yc-5.png");
            $("#slide-6").attr("src","img/Wan_yc-6.png");
            $("#slide-7").attr("src","img/Wan_yc-7.png");
            $("#slide-8").attr("src","img/Wan_yc-8.png");
            $("#slide-9").attr("src","img/Wan_yc-9.png");
            $("#slide-10").attr("src","img/Wan_yc-10.png");
            $('.game-btn').css("display","none");
        }
    }

})