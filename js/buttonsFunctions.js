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
    /** timer rules and functions **/
    $(".startTestDiv").hide();
    $("#test1Div").show();
    $('#timerDiv').timer();
});



$("#repeatTest").click(function() {

});
$("#test1Div").on("click", "#nextTest",function() {
    upgradeLvl();
    $("#quiz").empty();
    initJQuiz();
    $(".startTestDiv").show();
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



