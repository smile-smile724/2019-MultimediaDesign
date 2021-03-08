$(document).ready(function(){
    //轮播图
    var index=0;
    var items=$(".item");
    var slides=$(".slide");
    slides.hover(function(){
        index=$(this).index();
        $(this).addClass("active").stop(true,true).siblings().removeClass("active");
        items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
    });
    var timer=setInterval(function(){
        index++;
        if(index>items.length-1){
            index=0;
        }
        slides.eq(index).addClass("active").stop(true,true).siblings().removeClass("active");
        items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        
    },3000);
    $("#list").mousemove(function(){
        clearInterval(timer);
    }).mouseout(function(){
        timer=setInterval(function(){
            index++;
            if(index>items.length-1){
                index=0;
            }
            slides.eq(index).addClass("active").stop(true,true).siblings().removeClass("active");
            items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
            
        },3000);
    });

    //获取content和source
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
    
    $("#game-btn").click(function(){
        url = "/ppt?content="+content+"&source="+source+"&slide=0";//此处拼接内容
        window.location.href = url;
    });
    $("#view-btn").click(function(){
        if(content=="wan_yc"){
            location.href="/culture_remains";
        }
    });
    
    $("#back").click(function(){
        url = "/culture_map?content="+content;//此处拼接内容
        window.location.href = url;
    });
    //改变显示内容
    if(content=="DuS"){ 
        $("#blackboard").attr("src", "img/2.png"); 
        $("#item-1").attr("src", "img/独山村.jpg");    //更换图片地址
        $("#item-2").attr("src", "img/独山宗祠.jpg");   
        $("#item-3").attr("src", "img/独山.jpg");    
    }else if(content=="wan_yc"){
        $("#blackboard").attr("src", "img/3.png"); 
        $("#item-1").attr("src", "img/碗窑村.jpeg");    //更换图片地址
        $("#item-2").attr("src", "img/碗窑.jpg");   
        $("#item-3").attr("src", "img/古戏台.jpg");   
    }else if(content=="NanGeG"){
        $("#blackboard").attr("src", "img/1.png"); 
        $("#item-1").attr("src", "img/南阁古村.jpeg");    //更换图片地址
        $("#item-2").attr("src", "img/恩光.jpg");   
        $("#item-3").attr("src", "img/会魁.jpg");   
    }
})