       /**
     * WebSocket客户端
     *
     * 使用说明：
     * 1、WebSocket客户端通过回调函数来接收服务端消息。例如：webSocket.onmessage
     * 2、WebSocket客户端通过send方法来发送消息给服务端。例如：webSocket.send();
     */
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
            //获取服务端消息
            var message = JSON.parse(event.data) || {};
            var $messageContainer = $('.message-container'); 
            if (message.type === 'SPEAK') {
                if(message.username&&message.msg){
                    $messageContainer.append(
                        '<li class="message">'  + message.username + " ：" + message.msg + '</li>' );
                }
                if(message.control=="0"){
                    $("#back").css('display', 'block');
                    $(".video-btn").css('display', 'block');
                    $(".game-btn").css('display', 'block');
                }
                if(message.control=="1") {
                    url = "/ppt?content="+message.content+"&source="+message.source;//此处拼接内容
                    window.location.href = url;
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

            webSocket.send(JSON.stringify({control:0,username: $('#username').text(), msg: $message.val()}));
            $message.val(null);
        }

    }

    /**
     * 通过WebSocket对象发送控制消息给服务端
     */
    function Control() {
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
    
        webSocket.send(JSON.stringify({control:2,content:content,source:source}));
    }
    //解控
    function UnControl() {
        webSocket.send(JSON.stringify({control:0}));
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