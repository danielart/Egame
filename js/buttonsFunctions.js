/**
 * Created by dad on 31/03/2016.
 */
$("#rankingButton").click(function () {
    $(".sectionDiv").hide();
    $("#rankingDiv").show();
});

$("#goTestButton").click(function () {
    $(".sectionDiv").hide();
    //initJQuiz();
    $(".startTestDiv").show();
    $("#testDiv").show();

});

$("#homeButton").click(function () {
    $(".sectionDiv").hide();
    $("#homeDiv").show();
});

$("#startTestButton").click(function () {

    $(".planeAnimation").hide();
    $(".startTestDiv").hide();
    $("#test1Div").show();
    $('#timerDiv').timer();
});

$("#test1Div").on("click", "#nextTest",function() {

    $("#quiz").empty();
    initJQuiz();
    $(".startTestDiv").show();
    $(".planeAnimation").hide();
    $("#test1Div").hide();
    $('#timerDiv').timer();
});

$("#test1Div").on("click", "#repeatTest",function() {

    $("#quiz").empty();
    initJQuiz();
    $(".startTestDiv").show();
    $(".planeAnimation").hide();
    $("#test1Div").hide();
    $('#timerDiv').timer();
});

$("#loginButton").click(function(){
    //if($("#pass-expandable").val() == "helloworld"){
    $("#loginDiv").hide();
    $("#startDiv").show();
    //$("#userNameSpan").text($("#user-expandable").val());
    //}

});



