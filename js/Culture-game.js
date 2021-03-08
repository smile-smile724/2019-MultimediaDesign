// var init1={'questions':[{'question':'独山村以何而得名？','answers':['天马山独立于乌溪江东岸','村子内有一座山独立','村子在一座独立山上','以上都不是'],'correctAnswer':1},{'question':'南宋时哪位尚书迁居于此?','answers':['叶峦','叶泓渊','叶梦','叶弘'],'correctAnswer':3},{'question':'村区内遗存的建筑群属于：','answers':['隋朝','清朝','明代','元代'],'correctAnswer':3},{'question':'“万仞飞泉挂石龙，青城如雾洗芙蓉”的作者是谁？','answers':['辛弃疾 ','汤显祖','李白','李清照'],'correctAnswer':2}]};
// var init2={'questions':[{'question':'“天马行空，九龙抢珠”的来历？','answers':['曾在同一时期出九位名士','前山似马,后山九峰似九龙','这是本地的一个神话传说','以上都不是'],'correctAnswer':2},{'question':'叶氏大宗祠始建于哪个朝代?','answers':['明代','元末明初','元代','清朝'],'correctAnswer':2},{'question':'叶氏宗祠大门两边立的石雕是：','answers':['石马','石狮子','叶氏祖先雕塑','财神'],'correctAnswer':2},{'question':'葆守祠在叶氏大宗祠的哪个位置？','answers':['左侧','里面','后院','右侧'],'correctAnswer':1}]};
// var init3={'questions':[{'question':'葆守祠是独山村的什么场所？','answers':['健身俱乐部','乡文化中心','寺庙','以上都不是'],'correctAnswer':2},{'question':'“洊膺天宠”牌坊的用材是什么?','answers':['大理石','石英','黄岗岩','鹅卵石'],'correctAnswer':3},{'question':'独山村的旌节牌坊褒奖的是：','answers':['叶嗣俊','叶嗣俊之妻郑氏','叶梦','叶泓渊'],'correctAnswer':2},{'question':'独山村的旌节牌坊上额枋是什么图案？','answers':['凤凰牡丹','麒麟献瑞','双龙戏珠','龙凤呈祥'],'correctAnswer':1}]};

var init1 = {};
var init2 = {};
var init3 = {};

$(function(){

    $.ajax({
        url: '/travel/gamequestion',
        type: "get",
        async: false,
        data: { num: 1 },
        success: function (res) {
            init1.questions = res;
        },
        error: function (err) {
            console.log(err);
        }
    })
    $.ajax({
        url: '/travel/gamequestion',
        type: "get",
        async: false,
        data: { num: 2 },
        success: function (res) {
            init2.questions = res;
        },
        error: function (err) {
            console.log(err);
        }
    })
    $.ajax({
        url: '/travel/gamequestion',
        type: "get",
        async: false,
        data: { num: 3 },
        success: function (res) {
            init3.questions = res;
        },
        error: function (err) {
            console.log(err);
        }
    })
    console.log(init1,init2,init3)

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
        url = "/travel/culture_map?content="+content;///此处拼接内容
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
    });
    //点击喇叭播放语音
    $(".horn").click(function(){
        if(index==0){
            $("#dubbing").attr("src","dubbing/DuS-1.m4a")
            $("#dubbing").get(0).play();
        }else if(index==1){
            $("#dubbing").attr("src","dubbing/DuS-2.m4a")
            $("#dubbing").get(0).play();
        }else if(index==3){
            $("#dubbing").attr("src","dubbing/DuS-3.m4a")
            $("#dubbing").get(0).play();
        }else if(index==5){
            $("#dubbing").attr("src","dubbing/DuS-4.m4a")
            $("#dubbing").get(0).play();
        }else if(index==7){
            $("#dubbing").attr("src","dubbing/DuS-5.m4a")
            $("#dubbing").get(0).play();
        }
    })
    //获取题目
    // $.get("/refer",
    //         function(data,status){
               //黑屏切换
                var monologues=$(".monologues-word");
                var items=$(".monologues-item");
                var nexts=$(".monologues-next");
                var horns=$(".horn");
                var questions=$(".main");
                var index=0;
                if(index==0){
                    monologues.eq(0).stop(true,true).fadeIn(3000);
                    nexts.eq(0).stop(true,true).fadeIn(3000);
                    horns.eq(0).stop(true,true).fadeIn(3000);
                }
                $(".monologues-item").click(function(){
                    if(index==0){
                        $("#dubbing").get(0).pause();
                        index++;
                        items.eq(1).stop(true,true).fadeIn(3000).siblings().fadeOut();
                        monologues.eq(1).stop(true,true).fadeIn(3000);
                        nexts.eq(1).stop(true,true).fadeIn(3000);
                        horns.eq(0).stop(true,true).fadeIn(3000);
                        $(".nav").fadeIn();
                    }else if(index==1){
                        $("#dubbing").get(0).pause();
                        index++;
                        $(".main_bg img").attr("src","img/书房.png");
                        questions.eq(0).stop(true,true).fadeIn().siblings().fadeOut();
                        $(".nav").fadeIn();
                        $(".main h1").html("第一关  解救弟弟");
                        $("#wrong").html(0);
                        $("#right").html(0);
                        $("#word").html("叶弘渊：“我一定要保护我的弟弟，不能让他白白的失去生命”");
                        $('#quiz-container').jquizzy({
                            questions: init1.questions,
                            endText: '点击继续',
                            sendResultsURL:"/travel/dushan",
                            gotoURL:"/travel/ppt?content="+content+"&source="+source,
                            num:1
                        });
                    }else if(index==3){
                        $("#dubbing").get(0).pause();
                        index++;
                        questions.eq(0).stop(true,true).fadeIn().siblings().fadeOut();
                        $(".nav").fadeIn();
                        $(".main h1").html("第二关  教育侄子");
                        $("#wrong").html(0);
                        $("#right").html(0);
                        $("#word").html("叶弘渊：“千万不能懈怠学习，你的父亲去世了，你一定要更加努力，不能辱没了你的父亲。”");
                        $('#quiz-container').jquizzy({
                            questions: init2.questions,
                            endText: '点击继续',
                            sendResultsURL:"/travel/dushan",
                            gotoURL:"/travel/ppt?content="+content+"&source="+source,
                            num:2
                        });
                    }else if(index==5){
                        $("#dubbing").get(0).pause();
                        index++;
                        questions.eq(0).stop(true,true).fadeIn().siblings().fadeOut();
                        $(".nav").fadeIn();
                        $(".main h1").html("第三关  创办家塾");
                        $("#wrong").html(0);
                        $("#right").html(0);
                        $("#word").html("叶弘渊：“孩子们一定要努力读书，叶氏宗族的门楣靠你们光耀。”");
                        $('#quiz-container').jquizzy({
                            questions: init3.questions,
                            endText: '点击继续',
                            sendResultsURL:"/travel/dushan",
                            gotoURL:"/travel/ppt?content="+content+"&source="+source,
                            num:3
                        });
                    }
                })
                $("#quiz-container").click(function(){
                    if(index==2&&$(".qTitle").css("display")=="block"){
                        index++;
                        items.eq(2).stop(true,true).fadeIn(3000).siblings().fadeOut();
                        monologues.eq(2).stop(true,true).fadeIn(3000);
                        nexts.eq(2).stop(true,true).fadeIn(3000);
                        horns.eq(0).stop(true,true).fadeIn(3000);
                        $(".nav").fadeIn();
                        $(".main_bg img").attr("src","img/院子.png");
                    }else if(index==4&&$(".qTitle").css("display")=="block"){
                        index++;
                        items.eq(3).stop(true,true).fadeIn(3000).siblings().fadeOut();
                        monologues.eq(3).stop(true,true).fadeIn(3000);
                        nexts.eq(3).stop(true,true).fadeIn(3000);
                        horns.eq(0).stop(true,true).fadeIn(3000);
                        $(".nav").fadeIn();
                        $(".main_bg img").attr("src","img/私塾.png");
                    }else if(index==6&&$(".qTitle").css("display")=="block"){
                        index++;
                        items.eq(4).stop(true,true).fadeIn(3000).siblings().fadeOut();
                        monologues.eq(4).stop(true,true).fadeIn(3000);
                        nexts.eq(4).stop(true,true).fadeIn(3000);
                        horns.eq(0).stop(true,true).fadeIn(3000);
                        $(".nav").fadeIn();
                    }
                })

             
        // })
    
    
})