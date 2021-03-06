/*
      Version: 1.2.0
         Date: 11/03/2015
       Author: Matthew D Webb
      Website: http://www.searchlaboratory.com/

     Modified by Dani Artola to set new functions and allow to change between tests
 */





function initJQuiz(){

    'use strict';

    // GLOBAL:
    var $placeHolder = $('#quiz'),
        loadingGif = 'images/loading.gif',
        dataSource = 'test',
        currentQuestion = 0,
        questionCount = 0,
        answerArray = [],
        passed = false,
        infoMode = false,
        gotData = false,
        score = 0,
        testScore = 0,
        inMemoryData = {};

    // QUIZ LOGIC:
    var quiz = function () {

        // private methods:
        var getQuizData = function (url) {
            var promise = $.getJSON(url + currentUserLvl + ".json");
            console.log(url + currentUserLvl + ".json");
            return promise;
        };

        var getScore = function () {
            score = 0;
            $(answerArray).each(function (index, object) {
                score += parseInt(object[0].value, 10);
            });

            testScore = score;
            return score;
        };

        var updateScore = function (userAnswer) {
            answerArray.push(userAnswer);
        };

        var getHTML = function (data, currentQuestion) {
            var content, complete = true;
            $(data).each(function (index, object) {
                $(object.questions).each(function (index, object) {
                    if (currentQuestion === index) {
                        complete = false;
                        content = questionHTML(object.question, object.answers);
                        if (object.includeInfo) infoMode = true;
                    }
                });
            });
            if (complete) {

                //stop timer
                $("#timerDiv").parent().hide();
                var testPassed = false;
                $("#test1Div h2").text("Resultado del Test");
                console.log(score + " test resultado");
                if(testScore >= 5){
                    $(".planeAnimation").hide();
                    $("#planeAnimation"+currentUserLvl).show();
                    testPassed = true;


                } else {
                    passed = false;
                    testPassed = false;
                }
                content = resultHTML();
            }
            return content;
        };

        // BIND EVENT:

        var bindSubmit = function () {

            $(document).on('submit', 'form', function (event) {
                event.preventDefault();
                next(this);
                quiz().init();
            });
        };

        // ITERATION LOGIC:

        var next = function ($this) {
             var userAnswer = $($this).serializeArray();
             updateScore(userAnswer);
             currentQuestion++;
        };

        // DISPLAY RENDERING:

        // final message
        var resultHTML = function () {

            score = getScore();
            var message = resultMessage(score);

            if(score >= 5){
                $(".planeAnimation").hide();
                $("#planeAnimation"+currentUserLvl).show();
                upgradeLvl();
                var colorForIcon = 'green';
                var iconName = 'thumb_up';
                var button = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" id="nextTest">Siguiente Test</button>';

            } else {
                passed = false;
                var colorForIcon = 'red';
                var iconName = 'thumb_down';
                var button = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" id="repeatTest">Repetir Test</button>';
            }


            var _result = [];
	        $("#timerDiv").timer('pause');
            // result html after test result

            _result.push('<div id="" class="mdl-cell--12-col mdl-cell--12-col-tablet">');
            _result.push('<h3> Test finalizado' +
                    ' <i class="material-icons" style="color:' + colorForIcon + ';">' + iconName + '</i>'+
                ' </h3>');
            _result.push('<h4>' + message.title + '</h4>');
            _result.push('<p>' + message.description + '</p>');
            _result.push('<p>Puntuación: ' + score + '</p>');
            _result.push('<p>Tiempo: ' + $("#timerDiv").text() + '</p>');
            _result.push('<p>Total de preguntas: ' + questionCount + '</p>');
            _result.push('</br>');
            _result.push(button);
            _result.push('</div>');
            return _result.join('\n');
        };

        var resultMessage = function (score) {

            var message = {};
            $(inMemoryData).each(function (index, object) {
                $(object.results).each(function (index, object) {
                    if (score >= object.minScore) message = object;
                });
            });
            return message;
        };
        // question rendering
        var questionHTML = function (questionStr, $answers) {

            var _form = ['<form id="quizForm" class="mdl-cell mdl-cell--12-col mdl-grid mdl-cell--12-col-tablet">'];
            var _question = '<div id="questionDiv" class="mdl-cell--12-col mdl-grid mdl-cell--12-col-tablet"><p>' + questionStr + '</p></div>';
            var _buttonTxt = 'next';
            if(questionCount === (currentQuestion + 1) && infoMode) _buttonTxt = "Finish Quiz";
            var _button = '<button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" id="nextQuestion">  <i class="material-icons">keyboard_arrow_right</i></button>';;
            _form.push(_question);
            _form.push('<div id="questionDiv" class="mdl-cell--12-col mdl-cell--12-col-tablet">');

            $.each($answers, function (index, object) {

                var _answer = ['<div class="radio">', '<label>',
                    '<input type="radio"  class="mdl-radio__button" name="quizAnswer" required value="' + object.score + '">',
                object.answer, '</label>', '</div>'];

                _form.push(_answer.join('\n'));
            });
            _form.push('</div>');
            _form.push(_button);
            _form.push('</form>');

            return _form.join('\n');
        };

        // INITIALISE THE QUIZ:

        var init = function () {

            // show loading
            $placeHolder.html('<div class="divForLoading mdl-cell--12-col"> <img class="loadingGif"  src="' + loadingGif + '"/> </div>');

            // get json
            var requestData = getQuizData(dataSource).then(function (data) {
                // take a count of the number of questions:
                questionCount = data[0].questions.length;
                // handles in memory json:
                gotData = true;
                inMemoryData = data;
                return data;
            });

            // show question
            if (gotData) {

                setTimeout(function () { // unrequired timer.
                    var content = getHTML(inMemoryData, currentQuestion);
                    return $placeHolder.html(content);
                }, 200);

            } else {

                requestData.done(function (data) {
                    var content = getHTML(data, currentQuestion);
                    return $placeHolder.html(content);
                });
            }

            // error handler
            requestData.fail(function (data) {
                return $placeHolder.html("<p>Sorry, we are unable to retrieve the data for this quiz.</p>");
            });

        };

        // EXPOSED API:
        return {
            init: init,
            bindSubmit: bindSubmit
        };
    };

    quiz().init();
    quiz().bindSubmit();

}
