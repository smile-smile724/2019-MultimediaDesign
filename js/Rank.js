$(document).ready(function(){
    var index=0;
    $('.nav div').hover(function(){
        $.get("/refer",
            function(data,status){
                if(index===0)
                {
                    for(var i=0;i<data.names.length;i++)
                    {
                        var len;
                        index++;
                        len=(data.scores[i]/100)*550;
                        if(index===1){
                            $('.Rank-main').append(
                                '<li><ul><li class="No1">' + index + '</li><li class="rank-name">' + data.names[i] + 
                                '</li><li class="rank-strip" style="width:' + len + 'px"></li><li class="rank-score">' + data.scores[i] + '</li></ul> </li>');
                        }
                        else if(index===2){
                            $('.Rank-main').append(
                                '<li><ul><li class="No2">' + index + '</li><li class="rank-name">' + data.names[i] + 
                                '</li><li class="rank-strip" style="width:' + len + 'px"></li><li class="rank-score">' + data.scores[i] + '</li></ul> </li>');
                        }else{
                            $('.Rank-main').append(
                                '<li><ul><li class="other">' + index + '</li><li class="rank-name">' + data.names[i] + 
                                '</li><li class="rank-strip" style="width:' + len + 'px"></li><li class="rank-score">' + data.scores[i] + '</li></ul> </li>');
                        }
                    }
                }
        })
        $(".Rank").css('display', 'block');
    },function(){
        $(".Rank").css('display', 'none');
    })
    $('.nav div').click(function(){
        url = "/rank";
        window.location.href = url;
    })
})