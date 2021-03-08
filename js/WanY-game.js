window.onload=function(){
    
    var ni = $("#ni");
    var chai = $(".chai");
    var word = $(".word span");
    var count = 0;
    var i = 0;
    var score = 10;
    
        $(ni).click(function(){
            if(count==0) {
                $(this).css("left","55%");
                $(word).text("点击泥块塑造瓷胚！");
                count++;
            }
            else if(count==1) {
                var src = "img/泥3.png";    //新图片地址
                $(this).attr("src", src);    //更换图片地址
                count++;
            }
            else if (count==2) {
                var src = "img/泥4.png";    //新图片地址
                $(this).attr("src", src);    //更换图片地址
                count++;
            }
            else if (count==3) {
                var src = "img/泥5.png";    //新图片地址
                $(this).attr("src", src);    //更换图片地址
                $(word).text("点击瓷胚放到磁窑里吧！");
                count++;
            }
            else if(count==4) {
                $(this).css("left","5%");
                $(this).css("top","35%");
                var src = "img/泥5.png";    //新图片地址
                $(this).attr("src", src);    //更换图片地址
                $(word).text("点击木柴为磁窑添加木柴吧！");
                count++;
            }
            else if(count==5)
            {
                $(this).css("left","65%");
                $(this).css("top","14%");
                alert("烧制成功");
                $.ajax({
                    url: "/wanyao",
                    type: "post",
                    data: { add: score },
                    success: function (res,data) {
                        console.log(res)
                        // if(data){
                        //     alert("游戏结束，加分成功")
                        // }else {
                        //     alert("已经加过一次分了！")
                        // }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
                count++;
            }
        });
    // $(chai).click(function() {
    //     if (count==5) {
    //         $(this).css("left","12%");
    //         $(this).css("top","57%");
    //         var miss=setInterval(function(){
    //             $(chai).css("display", "none");    
    //         },2000);
    //         var timer=setInterval(function(){
    //             var src = "img/WanY.png";    //新图片地址
    //             $(ni).attr("src", src);    //更换图片地址
    //             $(word).text("属于你的瓷器出窑啦！将它取出来放到柜子上展示给大家看叭！");
    //             count++;
    //         },5000);
    //     }

    // });

        chai.click(function(){
            if(i==4){
                $("#warning").show();
                
            }
            i++;
            ni.css("animation","wanAnimate 5s");
            setTimeout(function(){
                ni.attr("src", "./img/cp.png");
                $(word).text("属于你的瓷器出窑啦！将它取出来放到柜子上展示给大家看叭！");

            },5000)
            $(this).css("left","27%");
            $(this).css("top","55%");
            $(this).css("width","8%");
        })
        

    //获取数据并跳转
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
        url = "/skills_map?content="+content;//此处拼接内容
        window.location.href = url;
    });


   $("#wanbtn").click(function(){
       $(".main").css("opacity","1");
       $("#window").hide();
       $("#dubbing").get(0).play();
   })
   $("#btn").click(function(){
       $("#warning").hide();
       score -= 2;
       $("#sco").text(score);
   })
};