$(function(){
    $("#homework button").click(function(){
        source= $(this).attr('id');
        url = "/question?source="+source;//此处拼接内容
        window.location.href = url;
    });
})