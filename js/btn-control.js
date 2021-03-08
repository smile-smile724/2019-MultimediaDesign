$(document).ready(function(){
    $("#back").css('display', 'block');
    $(".video-btn").css('display', 'block');
    $(".game-btn").css('display', 'block');
    $.get("/quiry",

        function(data,status){
            //判断是否为教师，如果是老师显示控制按钮，如果是学生则显示发送框。
            if(data.teacher){
                //教师端
                $(".control-btn").css('display', 'block');
                $(".uncontrol-btn").css('display', 'block');
                $(".chat_bot").css('display', 'none');
                if(data.control==1){
                    $("#back").css('display', 'none');
                    $(".video-btn").css('display', 'none');
                    $(".game-btn").css('display', 'none');
                }
            }else{
                //学生端
                $(".control-btn").css('display', 'none');
                $(".uncontrol-btn").css('display', 'none');
                $(".chat_bot").css('display', 'block');
                if(data.control==1){
                    $("#back").css('display', 'none');
                    $(".video-btn").css('display', 'none');
                    $(".game-btn").css('display', 'none');
                    $(".deck-prev-link").css('display', 'none');
                    $(".deck-next-link").css('display', 'none');
                }
            }
    });
    $(".control-btn").click(function(){
        $.post("/control",
            {
                control:true
            },
            function(data,status){
                //alert("数据: " + data + "\n状态: " + status);
            }
        )
    });
    $(".uncontrol-btn").click(function(){
        $.post("/control",
            {
                control:false
            },
            function(data,status){
                //alert("数据: " + data + "\n状态: " + status);
            }
        )
    });

})