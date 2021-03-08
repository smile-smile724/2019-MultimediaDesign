(function($) {
    $.fn.jquizzy = function(settings) {
        var defaults = {
            questions: null,
            startImg: 'img/start.png',  
            endText: '已结束',
            shortURL: null,
            sendResultsURL: null,
            gotoURL:null,
            num: null
        };

        var config = $.extend(defaults, settings);
        if (config.questions === null) {
            $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
            return;
        }

        var superContainer = $(this),
        answers = [],
        introFob = '<div class="intro-container slide-container"><a class="nav-start" href="#">请认真完成测试题。准备好了吗？<br/><br/><span><img src="'+config.startImg+'"></span></a></div>    ',
        exitFob = '<div class="results-container slide-container"><div class="question-number">' + config.endText + '</div><div class="result-keeper"></div></div><div class="notice">(请选择一个选项！)</div><div class="progress-keeper" ><div class="progress"></div></div>',
        contentFob = '',
        questionsIteratorIndex,
        answersIteratorIndex;
        superContainer.addClass('main-quiz-holder');
        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
            contentFob += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question">' + config.questions[questionsIteratorIndex].question + '</div><ul class="answers">';
            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
                contentFob += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }
            contentFob += '</ul><div class="nav-container">';
            if (questionsIteratorIndex < config.questions.length - 1) {
                contentFob += '<div class="next"><a class="nav-next" href="#"><img src="img/next.png"></a></div>';
            } else {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#"><img src="img/final.png"></a></div>';
            }
            contentFob += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }
        superContainer.html(introFob + contentFob + exitFob);
        var progress = superContainer.find('.progress'),
        progressKeeper = superContainer.find('.progress-keeper'),
        notice = superContainer.find('.notice'),
        progressWidth = progressKeeper.width(),
        userAnswers = [],
        questionLength = config.questions.length,
        slidesList = superContainer.find('.slide-container'),
        right_num=0,
        wrong_num=0;
        var time = 15;
        $("#time").html(time+"s");

      //判断答案
        function checkAnswers() {
            var resultArr = [],
            flag = false;
            for (i = 0; i < answers.length; i++) {
                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }

        function roundReloaded(num, dec) {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }

        
        progressKeeper.hide();
        notice.hide();
        slidesList.hide().first().fadeIn(500);

       //点击选项
        superContainer.find('li').click(function() {
            var thisLi = $(this);
            var MultiSelect =0;               //定义多选
       
                //单选
               /* if (thisLi.hasClass('selected')) {
                     thisLi.removeClass('selected');
                 } else {
                     thisLi.parents('.answers').children('li').removeClass('selected');
                     thisLi.addClass('selected');
                 }*/

        if(MultiSelect >1){
            //多选
            if(thisLi.attr("select") == "selected"){
                thisLi.attr("select","");
            }else{
                thisLi.attr("select","selected");
            }
            
        }else{
            //单选
           if (thisLi.hasClass('selected')) {
                     thisLi.removeClass('selected');
                 } else {
                     thisLi.parents('.answers').children('li').removeClass('selected');
                     thisLi.addClass('selected');
                 }  
        }

      
        // 继续
           $(".btns").click(function() {
              $(".result").hide();
              })
            });

        /*开始*/
        superContainer.find('.nav-start').click(function() {
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).next().fadeIn(500);
                progressKeeper.fadeIn(500);
            });

            //计时
            function test(){
                time--;
                $("#time").html(time+"s");
                if(time == 0){
                    clearInterval(timer);
                    notice.hide();
                    for(;flag<questionLength;flag++){
                        wrong_num++;
                        $("#wrong").html(wrong_num);
                    }
                    alert("时间到!");
                    if (config.gotoURL !== null) {
                        var grade=100-(wrong_num/config.questions.length)*100;
                        var add=(config.questions.length-wrong_num)*2;
                        // alert(config.questions.length);
                        if(grade<60){
                            var i=0;
                            alert("闯关失败！");
                            i++;
                            if(i==1){
                                window.location=config.gotoURL;
                            }
                        }else{
                            superContainer.find('li.selected').each(function(index) {
                                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
                            });
                            if (config.sendResultsURL === "/dushan") {
                                $.ajax({
                                    type: 'POST',
                                    url: config.sendResultsURL,
                                    data: {
                                        num:config.num,
                                        add:add
                                    },
                                    success: function(data,status){
                                        //alert("数据: " + data + "\n状态: " + status);
                                        if(!data){
                                            alert("在本页面已加过分，本次操作不重复加分！");
                                        }
                                    }
                                });
                            }
                        }
                    };
                    
                    progressKeeper.hide();
                    var results = checkAnswers(),
                    resultSet = '',
                    trueCount = 0,
                    shareButton = '',
                    score,
                    url;
                    if (config.shortURL === null) {
                        config.shortURL = window.location
                    };
                    for (var i = 0,
                    toLoopTill = results.length; i < toLoopTill; i++) {
                        if (results[i] === true) { 
                            trueCount++;
                            isCorrect = true;
                        }
                        resultSet += '<div class="result-row">' + (results[i] === true ? "<div class='correct'>#"+(i + 1)+"<span></span></div>": "<div class='wrong'>#"+(i + 1)+"<span></span></div>");
                        resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                        resultSet += "<ul>";
                        for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                            var classestoAdd = '';
                            if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                                classestoAdd += 'right';
                            }
                            if (userAnswers[i] == answersIteratorIndex + 1) {
                                classestoAdd += ' selected';
                            }
                            resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                        }
                        resultSet += '</ul></div></div>';
                    }
                    score = roundReloaded(trueCount / questionLength * 100, 2);
                    resultSet = '<h2 class="qTitle">' +  '<br/> 您的分数： ' + score + '</h2>' + shareButton + '<div class="jquizzy-clear"></div>' + resultSet + '<div class="jquizzy-clear"></div>';
                    superContainer.find('.result-keeper').html(resultSet).show(500);
                    superContainer.find('.resultsview-qhover').hide();
                    superContainer.find('.result-row').hover(function() {
                        $(this).find('.resultsview-qhover').show();
                    },          
                    function() {
                        $(this).find('.resultsview-qhover').hide();
                    });
                    superContainer.find('.next').parents('.slide-container').css("display","none");
                    superContainer.find('.final').parents('.slide-container').fadeOut(500,
                        function() {
                            $(this).next().fadeIn(500);
                        });
                }
            }
            timer= setInterval(test,1000);

            return false;           
        });


        /*下一题*/
         var flag=0;//用于标记
        superContainer.find('.next').click(function() {
          flag++;
             //未选中消息提醒
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                flag--;
                return false;
            }

            //答题判断对错
            var index=superContainer.find('li.selected').eq(flag-1).index()+1;
            var userAnswer=index;
            var right=false;
            var items=answers[flag-1].toString().split(",");
            for(var i=0;i<items.length;i++)
            {
                if(items[i]==userAnswer)
                {
                    right=true;
                    right_num++;
                }else{
                    wrong_num++;
                }
            }
            if(right){

                $("#right").html(right_num);

            }else{
                $("#wrong").html(wrong_num);
                if (config.gotoURL !== null) {
                    var grade=100-(wrong_num/config.questions.length)*100;
                    // alert(config.questions.length);
                    if(grade<60){
                        var i=0;
                        alert("闯关失败！");
                        i++;
                        if(i==1){
                            window.location=config.gotoURL;
                        }
                    }
                };
            }
             //console.log(answers[flag]);
             //console.log(userAnswer);

            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).next().fadeIn(500);
            });
            progress.animate({
                width: progress.width() + Math.round(progressWidth / questionLength)
            },
            500);
            return false;
        });


        

        /*完成*/
        superContainer.find('.final').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }
            clearInterval(timer);
            superContainer.find('li.selected').each(function(index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });
            if (config.sendResultsURL === "/dushan") {
                var add=(config.questions.length-wrong_num)*2;
                $.ajax({
                    type: 'POST',
                    url: config.sendResultsURL,
                    data: {
                        num:config.num,
                        add:add
                    },
                    success: function(data,status){
                        //alert("数据: " + data + "\n状态: " + status);
                        if(!data){
                            alert("在本页面已加过分，本次操作不重复加分！");
                        }
                    }
                });
            }
            progressKeeper.hide();
            var results = checkAnswers(),
            resultSet = '',
            trueCount = 0,
            shareButton = '',
            score,
            url;
            if (config.shortURL === null) {
                config.shortURL = window.location
            };
            
            resultSet += '<div class="result-list">';
            for (var i = 0,toLoopTill = results.length; i < toLoopTill; i++) {
                if (results[i] === true) { 
                    trueCount++;
                    isCorrect = true;
                }
                resultSet += '<div class="result-row">' + (results[i] === true ? "<div class='correct'>#"+(i + 1)+"<span></span></div>": "<div class='wrong'>#"+(i + 1)+"<span></span></div>");
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                        classestoAdd += 'right';
                    }
                    if (userAnswers[i] == answersIteratorIndex + 1) {
                        classestoAdd += ' selected';
                    }
                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                }
                resultSet += '</ul></div></div>';
            }
            resultSet += '</div>';
            score = roundReloaded(trueCount / questionLength * 100, 2);
            
            resultSet = '<h2 class="qTitle">' +  '<br/> 您的分数： ' + score + '</h2>' + shareButton + '<div class="jquizzy-clear"></div>' + resultSet + '<div class="jquizzy-clear"></div>';
            superContainer.find('.result-keeper').html(resultSet).show(500);
            superContainer.find('.resultsview-qhover').hide();
            superContainer.find('.result-row').hover(function() {
                $(this).find('.resultsview-qhover').show();
            },
            function() {
                $(this).find('.resultsview-qhover').hide();
            });
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).next().fadeIn(500);
            });
            return false;
        });

        
    };
})(jQuery);