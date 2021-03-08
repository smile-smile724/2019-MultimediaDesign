$(function(){
    //返回
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
    $("#back").click(function(){
        url = "/story_map?content="+content;//此处拼接内容
        window.location.href = url;
    });
    //关闭音乐
    $("#music-btn").click(function(){
        if(!$("#music").get(0).paused){
            $("#music-btn").attr("src","img/closemusic.png");
            $("#music").get(0).pause();
        }else{
            $("#music-btn").attr("src","img/onmusic.png");
            $("#music").get(0).play();
        }
    })

    //点击喇叭播放语音
    $(".horn").click(function(){
        if(index==0){
            $("#dubbing").attr("src","钱王片头/钱王片头.m4a")
            $("#dubbing").get(0).play();
        }else if(index==3){
            $("#dubbing").attr("src","钱王片头/黑屏2.m4a")
            $("#dubbing").get(0).play();
        }else if(index==5){
            $("#dubbing").attr("src","钱王片头/结尾黑屏.m4a")
            $("#dubbing").get(0).play();
        }
    })

    //游戏部分
    var index=0;
    var monologues=$(".word");
    var items=$(".item");
    var nexts=$(".next");
    var talks=$(".talk");
    var talk_boxs=$(".talk_box");
    var horns=$(".horn");
    var talk_index=0;
    var flag=false;
    var score=10;
    //显示钱王对话框
    var king_show=function(){
        $(".general").fadeOut(),
        $(".king").fadeIn(1000)
        talks.eq(talk_index).stop(true,true).fadeIn(1000).siblings().fadeOut();
        talk_index++;
    }

    //显示将领对话框
    var general_show=function(){
        $(".king").fadeOut(),
        $(".general").fadeIn(1000)
        talks.eq(talk_index).stop(true,true).fadeIn(1000).siblings().fadeOut();
        talk_index++;
    }

    //显示旁白对话框
    var voice_show=function(){
        $(".general").fadeOut(),
        $(".king").fadeOut()
        talks.eq(talk_index).stop(true,true).fadeIn(3000).siblings().fadeOut();
        talk_index++;
    }

    //对话框切换以及场景切换
    if(index==0){
        monologues.eq(0).stop(true,true).fadeIn(1000);
        nexts.eq(0).stop(true,true).fadeIn(1000);
        horns.eq(0).stop(true,true).fadeIn(1000);
    }
    $(".main").click(function(){
        if(index==0){
            index++;
            $("#dubbing").get(0).pause();
            horns.eq(0).stop(true,true).fadeOut();
            items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
            talk_boxs.eq(0).stop(true,true).fadeIn(1000);
            $(".general").fadeIn(1000);
            talks.eq(talk_index).stop(true,true).fadeIn(1000);
            talk_index++;
        }else if(index==3){
            if(flag){
                index++;
                $("#dubbing").get(0).pause();
                horns.eq(0).stop(true,true).fadeOut();
                items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
                $(".general").fadeOut(),
                $(".king").fadeIn(1000)
                talk_boxs.eq(2).stop(true,true).fadeIn(1000);
                talks.eq(talk_index).stop(true,true).fadeIn(1000);
                talk_index++;
                flag=false;
            }else{
                flag=true;
            }
        }
    })
    $(".talk_box").click(function(){
        if(index==1){
            index++;
            $("#dubbing").get(0).pause();
            horns.eq(0).stop(true,true).fadeOut();
            items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
            talk_boxs.eq(index-1).stop(true,true).fadeIn(1000);
            if(talk_index==1){
                $(".general").fadeIn(1000);
                $("#dubbing").attr("src","钱王片头/将领1.m4a")
                $("#dubbing").get(0).play();
            }
            talks.eq(talk_index).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
        }else if(index==2){
            if(talk_index==2){
                king_show();
            }else if(talk_index==3){
                $("#dubbing").get(0).pause();
                general_show();
                $("#dubbing").attr("src","钱王片头/将领2.m4a")
                $("#dubbing").get(0).play();
            }else if(talk_index==4){
                $("#dubbing").get(0).pause();
                king_show();
            }
            else if(talk_index==6){
                if(flag){
                    $("#dubbing").get(0).pause();
                    general_show();
                    $("#dubbing").attr("src","钱王片头/将领3.m4a")
                    $("#dubbing").get(0).play();
                    flag=false;
                }else{
                    flag=true;
                }
            }else if(talk_index==7){
                $("#dubbing").get(0).pause();
                general_show();
                $("#dubbing").attr("src","钱王片头/将领4.m4a")
                $("#dubbing").get(0).play();
            }else if(talk_index==8){
                $("#dubbing").get(0).pause();
                king_show();
            }else if(talk_index==9){
                general_show();
                $("#dubbing").attr("src","钱王片头/将领5.m4a")
                $("#dubbing").get(0).play();
            }else if(talk_index==10){
                $("#dubbing").get(0).pause();
                king_show();
            }else if(talk_index==12){
                if(flag){
                    king_show();
                    flag=false;
                }else{
                    flag=true;
                }
            }else if(talk_index==13){
                index++;
                items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
                monologues.eq(1).stop(true,true).fadeIn(1000);
                nexts.eq(1).stop(true,true).fadeIn(1000);
                horns.eq(0).stop(true,true).fadeIn(1000);
            }
        }else if(index==4){
            if(talk_index==14){
                voice_show();
                $("#dubbing").attr("src","钱王片头/旁白1.m4a")
                $("#dubbing").get(0).play();
            }//插入扔纸的动画
            else if(talk_index==15){
                $("#dubbing").get(0).pause();
                king_show();
                var step=0;
                if(step==0){
                    $("#zhi").fadeIn(1000);
                    step++;
                }
                if(step==1){
                    setInterval(function(){
                        $("#zhi").css("top", "55%"); 
                        $("#zhi").css("left", "60%"); 
                        $("#zhi").css("transform", "rotate(60deg)");    
                    },1000);
                    step++;
                }
                if(step==2){
                    setInterval(function(){
                        $("#zhi").fadeOut();  
                    },4000);
                    step++;
                }
            }else if(talk_index==16){
                voice_show();
                $("#dubbing").attr("src","钱王片头/旁白2.m4a")
                $("#dubbing").get(0).play();
            }else if(talk_index==17){
                $("#dubbing").get(0).pause();
                general_show();
                $("#dubbing").attr("src","钱王片头/将领6.m4a")
                $("#dubbing").get(0).play();
            }else if(talk_index==18){
                $("#dubbing").get(0).pause();
                king_show();
            }else if(talk_index==20){
                $("#dubbing").get(0).pause();
                if(flag){
                    king_show();
                    flag=false;
                }else{
                    flag=true;
                }
            }//插入射箭的动画
            else if(talk_index==21){
                if(flag){
                    voice_show();
                    $("#dubbing").attr("src","钱王片头/旁白4.m4a")
                    $("#dubbing").get(0).play();
                    var step=0;
                    if(step==0){
                        $(".arrow").fadeIn(1000);
                        step++;
                    }
                    if(step==1){
                        $("#scene-3").css("background","url(img/放箭背景2.png) no-repeat")
                        $(".arrow").css("top","20%");
                        $(".arrow").css("width","70%");
                        $(".arrow").css("margin-left","15%");
                        step++;
                    }
                    if(step==2){
                        $("#scene-3").css("background","url(img/放箭背景3.png) no-repeat")
                        $(".arrow").fadeOut(1000);
                    }
                    flag=false;
                }else{
                    flag=true;
                }
            }else if(talk_index==22){
                $("#dubbing").get(0).pause();
                king_show();
            }else if(talk_index==24){
                if(flag){
                    voice_show();
                    $("#dubbing").attr("src","钱王片头/旁白5.m4a")
                    $("#dubbing").get(0).play();
                    var step=0;
                    if(step==0){
                        $(".arrow").css("bottom","0");
                        $(".arrow").css("width","100%");
                        $(".arrow").css("margin-left","0");
                        $(".arrow").fadeIn(1000);
                        step++;
                    }
                    if(step==1){
                        $(".arrow").css("top","20%");
                        $(".arrow").css("width","70%");
                        $(".arrow").css("margin-left","15%");
                        step++;
                    }
                    if(step==2){
                        $(".arrow").fadeOut(1000);
                    }
                    $("#scene-3").css("background","url(img/退潮.png) no-repeat")
                    flag=false;
                }else{
                    flag=true;
                }
            }else if(talk_index==25){
                $("#dubbing").get(0).pause();
                index++;
                items.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
                monologues.eq(2).stop(true,true).fadeIn(1000);
                nexts.eq(2).stop(true,true).fadeIn(1000);
                horns.eq(0).stop(true,true).fadeIn(1000);
                $.post('/qianwang',
                    {
                        add:score
                    },
                    function(data,status){
                        //alert("数据: " + data + "\n状态: " + status);
                        if(!data){
                            alert("在本页面已加过分，本次操作不重复加分！");
                        }
                    }
                )
            }
        }
    });
    $(".option-1").click(function(){
        if(talk_index==5){
            talks.eq(talk_index).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
        }else if(talk_index==11){
            talks.eq(talk_index).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
        }else if(talk_index==19){
            voice_show();
            $("#dubbing").attr("src","钱王片头/旁白3.m4a")
            $("#dubbing").get(0).play();
        }else if(talk_index==23){
            king_show();
        }
    });
    $(".option-2").click(function(){
        if(talk_index==5){
            $(".king").fadeOut(),
            $(".general").fadeIn(1000)
            talks.eq(talk_index+1).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
            flag=true;
            score=score-2;
        }else if(talk_index==11){
            $(".general").fadeOut(),
            $(".king").fadeIn(1000)
            talks.eq(talk_index+1).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
            flag=true;
            score=score-2;
        }else if(talk_index==19){
            $(".general").fadeOut(),
            $(".king").fadeOut()
            talks.eq(talk_index+2).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
            talk_index++;
            flag=true;
            score=score-2;
        }else if(talk_index==23){
            $(".general").fadeOut(),
            $(".king").fadeIn(1000)
            talks.eq(talk_index+1).stop(true,true).fadeIn(1000).siblings().fadeOut();
            talk_index++;
            flag=true;
            score=score-2;
        }
    })
})