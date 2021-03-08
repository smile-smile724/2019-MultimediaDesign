$(document).ready(function(){
    
    $("#btn").click(function(){
        if($("#username").val()==""){
            alert("账户不能为空");
            return false;
        }
        if($("#password").val()==""){
            alert("密码不能为空");
            return false;
        }
        if($("#username").val()!=""&&$("#password").val()!=""){
            $.post(URL + "/register",
            {
                username:$("#username").val(),
                password:$("#password").val(),
                usertype :$("input[name='usertype']:checked").val()
            },
                function(data,status){
                //alert("数据: " + data + "\n状态: " + status);
                    //alert(data.family);
                    //alert(data.gredo);
                    //alert(data.judge);

                if(data.judge) {

                    if(data.teacher)
                    {    
                        //教师端
                        window.location="/index";
                    }else{
                        //学生端

                        if(data.gredo&&(data.family==null)){
                            //组长未组队
                            window.location="/family";
                        }else{
                            window.location="/index";
                        }
                    }
                }else {
                    window.location="/login";
                    alert("账户或密码错误");
                }
            });
        }

    });
});