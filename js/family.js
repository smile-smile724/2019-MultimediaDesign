$(document).ready(function(){
    var num = 2;
    var people=$(".people");
    var i = $(".i");
    $("#ad").click(function(){
        if(num<5){
            var top = parseInt($(this).css("padding-top"));
            top = top + 64 ;
            people.eq(num).stop(true,true).fadeIn();
            i.eq(num).stop(true,true).fadeIn();
            $(this).css("padding-top",top+"px");
            num++;
        }else{
            alert("组员不得多于五名！");
        }
    })
    $("#btn").click(function(){
        if($("#family").val()==""){
            alert("家族名称不能为空！");
            return false;
        }else {
            var datas = [];
            $(".people").each(function(){
                datas.push($(this).val());
            });
            for(var i = 0;i<num;i++){
                // alert(data[i]);
                if(datas[i]==""){
                    alert("组员名称不得为空！");
                    return false;
                }
            }
            var peoples =[];
            for(var i = 0;i<num;i++){
                peoples[i] = datas[i];
            }
            //console.log(peoples)
        }
        //传值
           // alert(peoples[1]);
            var name = $("#family").val();
            var data = {
                familyname: name,
                ids: peoples
            }
            $.ajax({
                url: "/finish",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (res) {
                    console.log(res)
                    if(res){
                        alert("组队成功！");
                        window.location="/index";
                    }else{
                        window.location="/family";
                        alert("组队失败！");
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
            // $.post("/finish",
            // {
            //     familyname:$("#family").val(),
            //     ids:peoples
            // },


        
    });
    
});