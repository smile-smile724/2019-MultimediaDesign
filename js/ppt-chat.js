       /**
     * WebSocket客户端
     *
     * 使用说明：
     * 1、WebSocket客户端通过回调函数来接收服务端消息。例如：webSocket.onmessage
     * 2、WebSocket客户端通过send方法来发送消息给服务端。例如：webSocket.send();
     */
            //获取地址栏数据
    
var value=new Array();
function UrlSearch() {
    
    var name=new Array();
    var str=location.href; //取得整个地址栏
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var num=str.indexOf("?")
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
var content = value[0];
var source = value[1];
var slide = value[2];
    function getWebSocket() {
        /**
         * WebSocket客户端 PS：URL开头表示WebSocket协议 中间是域名端口 结尾是服务端映射地址
         */
        var webSocket = new WebSocket( 'ws://'+ URL +'/websocket');
        /**
         * 当服务端打开连接
         */
        webSocket.onopen = function (event) {
            console.log('WebSocket打开连接');
        };



        /**
         * 当服务端发来消息：1.广播消息 2.更新在线人数
         */
        webSocket.onmessage = function (event) {
            console.log('WebSocket收到消息：%c' + event.data, 'color:green');
            UrlSearch();
            var message = JSON.parse(event.data) || {};
            var $messageContainer = $('.message-container'); 
            if (message.type === 'SPEAK') {

                if(message.username&&message.msg){
                    $messageContainer.append(
                        '<li class="message">'  + message.username + " ：" + message.msg + '</li>' );
                }
                if(message.control=="0"){
                    $("#back").css('display', 'block');
                    $(".game-btn").css('display', 'block');
                    $(".video-btn").css('display', 'block');
                    if(source=="Skill"){
                        if(content=="HuangJ"){
                            $('.game-btn').css("display","none");
                            $('.video-btn').css("display","none");
                        }
                    }else if(source=="Culture"){
                        //如果是传统文化
                        $('.video-btn').css("display","none");
                        //ppt内容
                        if(content=="NanGeG"){
                            $('.game-btn').css("display","none");
                        }else if(content=="wan_yc"){
                            $('.game-btn').css("display","none");
                        }
                    }
                }
                if(message.control=="1") {
                    $("#back").css('display', 'none');
                    $(".video-btn").css('display', 'none');
                    $(".game-btn").css('display', 'none');
                    if($(".control-btn").css("display")=="none"&&$(".uncontrol-btn").css("display")=="none"){
                        $(".deck-prev-link").css('display', 'none');
                        $(".deck-next-link").css('display', 'none');
                    }else if($(".uncontrol-btn").css("display")=="block"&$(".uncontrol-btn").css("display")=="block"){
                        $(".deck-next-link").attr("onclick","next_Slide();");
                        $(".deck-prev-link").attr("onclick","prev_Slide();");
                    }
                }
                if(message.control=="2") {
                    url = "/video?content="+message.content+"&source="+message.source;//此处拼接内容
                    window.location.href = url;
                }
                if(message.control=="1"&&message.slide&&$(".deck-next-link").css("display")=="none"&&$(".deck-prev-link").css("display")=="none") {
                    UrlSearch();
                    slide = value[2];
                //  alert(content);
                    if(message.slide>slide){
                        var sub=message.slide-slide;
                        for(var i=0;i<sub;i++){
                            $(".deck-next-link").click();
                        }
                    }else if(message.slide<slide){
                        var sub=slide-message.slide;
                        for(var i=0;i<sub;i++){
                            $(".deck-prev-link").click();
                        }
                    }
                }
            }
            

            $('.chat_number').text(message.onlineCount);
            $messageContainer.scrollTop($messageContainer[0].scrollHeight);
            
        };

        /**
         * 关闭连接
         */
        webSocket.onclose = function (event) {
            console.log('WebSocket关闭连接');
        };

        /**
         * 通信失败
         */
        webSocket.onerror = function (event) {
            console.log('WebSocket发生异常');

        };
        return webSocket;
    }

    var webSocket = getWebSocket();


    /**
     * 通过WebSocket对象发送消息给服务端
     */
    function sendMsgToServer() {
        var $message = $('#msg');
        if ($message.val()) {

            webSocket.send(JSON.stringify({control:9,username: $('#username').text(), msg: $message.val()}));
            $message.val(null);
        }

    }

    
    /**
     * 通过WebSocket对象发送控制消息给服务端
     */
    function Control() {
        UrlSearch();
        content = value[0];
        source = value[1];
        webSocket.send(JSON.stringify({control:1,content:content,source:source}));
    }
    //解控
    function UnControl() {
        webSocket.send(JSON.stringify({control:0}));
    }
    //控制ppt
    function prev_Slide() {
        UrlSearch();
        content = value[0];
        source = value[1];
        slide = Number(value[2]);
        if($(".game-btn").css("display")=="none"&&$("#back").css("display")=="none"){
            webSocket.send(JSON.stringify({control:1,content:content,source:source,slide:slide}));
        }
    }
    function next_Slide() {
        UrlSearch();
        var content = value[0];
        var source = value[1];
        slide = Number(value[2]);
        if($(".game-btn").css("display")=="none"&&$("#back").css("display")=="none"){
            webSocket.send(JSON.stringify({control:1,content:content,source:source,slide:slide}));
        }
    }
    /**
     * 清屏
     */
    function clearMsg() {
        $(".message-container").empty();
    }

    /**
     * 使用ENTER发送消息
     */
    document.onkeydown = function (event) { 
        var e = event || window.event || arguments.callee.caller.arguments[0];
        e.keyCode === 13 && sendMsgToServer();
    };