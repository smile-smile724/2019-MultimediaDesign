// var init1={'questions':[{'question':'黄酒是浙江省哪个村子的特色？','answers':['东埔村','黄檀硐村','独山村','碗窑村'],'correctAnswer':1},{'question':'碗窑中用手塑造泥的形状是哪一部?','answers':['练泥','拉坯','印泥','利坯'],'correctAnswer':2},{'question':'削去青皮后的嫩竹筒叫：','answers':['青坯','白坯','竹坯','以上都不是'],'correctAnswer':2},{'question':'下列不属于传统技艺的是','answers':['剪纸','陶艺','舞龙','射箭'],'correctAnswer':4}]};
// var init2={'questions':[{'question':'叶氏大宗祠属于下列哪个村子？','answers':['独山村','黄檀硐村','碗窑村','东埔村'],'correctAnswer':1},{'question':'南阁古村位于哪个市?','answers':['宁波','温州','杭州','台州'],'correctAnswer':2},{'question':'“世进士”属于：','answers':['东埔村','南阁古村','独山村','碗窑村'],'correctAnswer':2},{'question':'章纶是哪个朝代的诤臣？','answers':['清朝','明代','元代','宋朝'],'correctAnswer':2}]};
// var init3={'questions':[{'question':'“黄河日修一斗金，钱江日修一斗银”中钱江指：','answers':['黄浦江','长江','钱塘江','湘江'],'correctAnswer':3},{'question':'是谁作恶引起的潮水决堤?','answers':['天神','河神','潮神','东海龙王'],'correctAnswer':3},{'question':'钱王用劝退潮神的武器是：','answers':['三叉戟','弓箭','匕首','大刀'],'correctAnswer':2},{'question':'钱王为什么选八月八日射箭于潮神？','answers':['这天钱王心情好','这天钱王生日','这天潮神生日','八月八是个风水吉日'],'correctAnswer':3}]};
var init1 = {};
var init2 = {};
var init3 = {};
$(function(){

    $.ajax({
        url: URL + '/afrerquestion',
        type: "get",
        async: false,
        data: { type: "skill" },
        success: function (res) {
            init1.questions = res;
        },
        error: function (err) {
            console.log(err);
        }
    })
    $.ajax({
        url: URL + '/afrerquestion',
        type: "get",
        async: false,
        data: { type: "story" },
        success: function (res) {
            init2.questions = res;
        },
        error: function (err) {
            console.log(err);
        }
    })
    $.ajax({
        url: URL + '/afrerquestion',
        type: "get",
        async: false,
        data: { type: "culture" },
        success: function (res) {
            init3.questions = res;
        },
        error: function (err) {
            console.log(err);
        }
    })

    $(".main").css("display","block");
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
    var source = value[0];
    // alert(source);
    $(".horn").click(function(){
        if(source=="Skill"){
            $("#dubbing").attr("src","notice/技艺课后.m4a")
            $("#dubbing").get(0).play();
        }else if(source=="Culture"){
            $("#dubbing").attr("src","notice/村子课后.m4a")
            $("#dubbing").get(0).play();
        }else if(source=="Story"){
            $("#dubbing").attr("src","notice/传说课后.m4a")
            $("#dubbing").get(0).play();
        }
    })
    
    if(source=="Skill"){
        $(".main h1").html("传统技艺");
        $("#word").html("快看看有没有忘记刚刚学会的传统技艺吧？");
        $('#quiz-container').jquizzy({
            questions: init1.questions,
        });
    }else if(source=="Culture"){
        $(".main h1").html("传统文化");
        $("#word").html("在村子里你学到了什么呢？");
        $('#quiz-container').jquizzy({
            questions: init2.questions,
        });
    }else if(source=="Story"){
        $(".main h1").html("乡土传说");
        $("#word").html("刚才经历过的传说还记得多少呢？");
        $('#quiz-container').jquizzy({
            questions: init3.questions,
        });
    }
    
    $("#back").click(function(){
        url = "/index?source="+source;//此处拼接内容
        window.location.href = url;
    });
    
})