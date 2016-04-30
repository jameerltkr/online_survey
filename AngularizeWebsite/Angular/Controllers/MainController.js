//main controller
main.controller("MainController", function ($scope, $location, $http) {
    var survey_name = '';
    var survey_ques = [];
    var ques_options = [];
    var ques_id = 0;

    $("#surveyName").css("display", "");
    $("#surveyQuestions").css("display", "none");
    $("#surveyOptions").css("display", "none");

    $scope.ABC = "ABC";
    $scope.phones = [
    {
        'name': 'Nexus S',
        'snippet': 'Fast just got faster with Nexus S.'
    },
    {
        'name': 'Motorola XOOM™ with Wi-Fi',
        'snippet': 'The Next, Next Generation tablet.'
    },
    {
        'name': 'MOTOROLA XOOM™',
        'snippet': 'The Next, Next Generation tablet.'
    }
    ];

    $scope.redirect = function () {
        console.log('hi');
        $location.path('/SurveyForm');

    }

    $scope.createSurveyName = function () {
        survey_name = $scope.txtSurveyName;
        $scope.displayOutput = true;

        $("#surveyName").css("display", "none");
        $("#surveyQuestions").css("display", "");
        $("#surveyOptions").css("display", "none");
    };

    $scope.addQues = function () {
        ques_id++;

        survey_ques.push({
            ques_text: $scope.txtQuesText,
            ques_id: ques_id
        });

        $("#surveyName").css("display", "none");
        $("#surveyQuestions").css("display", "none");
        $("#surveyOptions").css("display", "");

        // preview options
        var html = '';
        html += '<div class="row">';
        html += '<label>' + ques_id + ". " + $scope.txtQuesText + '</label>';
        html += '<br />';
        html += '<div id="optionsDiv' + ques_id + '">';
        //html += '<input type="radio" value="' + $scope.txtOptionText + '" name="' + ques_id + '" />' + $scope.txtOptionText;
        html += '</div>';
        html += '</div>';

        $("#displayOutput").append(html);
        $scope.txtQuesText = '';
    };

    $scope.backBtn = function () {

        $("#surveyName").css("display", "none");
        $("#surveyQuestions").css("display", "");
        $("#surveyOptions").css("display", "none");
    };

    $scope.cancelSurvey = function () {
        $scope.displayOutput = false;

        survey_name = '';
        survey_ques = [];
        ques_options = [];
        ques_id = 0;
        $("#displayOutput").find('div').remove('div');

        $("#surveyName").css("display", "");
        $("#surveyQuestions").css("display", "none");
        $("#surveyOptions").css("display", "none");
    };

    $scope.addOptions = function () {
        $("#surveyName").css("display", "none");
        $("#surveyQuestions").css("display", "none");
        $("#surveyOptions").css("display", "");

        // preview options
        var html = '';
        html += '<input type="radio" value="' + $scope.txtOptionText + '" name="' + ques_id + '" />' + $scope.txtOptionText;
        $("#optionsDiv" + ques_id).append(html);
        ques_options.push({
            option_text: $scope.txtOptionText,
            ques_id: ques_id
        });
        $scope.txtOptionText = '';

        $scope.isFinalSave = true;
    };

    $scope.finalSave = function () {
        var param = JSON.stringify({
            survey_name: survey_name,
            survey_ques: survey_ques,
            options: ques_options,
            userid: sessionStorage.getItem('userid')
        });

        var dd = $http.post("/CreateSurvey", param);

        dd.then(function (data) {
            alert(data);
        }, function (err) {
            //$scope.pages = page.data.data[0].page_data;
            alert('Error while saving records in database');
        });
    };

    // View Surveys
    var survey = $http.get("/AllSurvey/" + sessionStorage.getItem('userid'));

    survey.then(function (data) {
        //alert(data);
        $scope.survey = data.data;
    }, function (err) {
        //$scope.pages = page.data.data[0].page_data;
        alert('Error while saving records in database');
    });


    $scope.viewSurvey = function () {

    };

    $scope.editSurvey = function () {

    };

    $scope.deleteSurvey = function () {

    };
});