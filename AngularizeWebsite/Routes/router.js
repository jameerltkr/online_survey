var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var survey = require('../Models/Survey');
//Used for routes that must be authenticated.
// function isAuthenticated (req, res, next) {
//     // if user is authenticated in the session, call the next() to call the next request handler 
//     // Passport adds this method to request object. A middleware is allowed to add properties to
//     // request and response objects
//     //allow all get request methods
//     if(req.method === "GET"){
// 		console.log("unauthenticated");	
//         return next();
//     }
//     if (req.isAuthenticated()){
// 		console.log("authenticated");
//         return next();
//     }
//     console.log(req.user);
// 	 return next();
//     // if the user is not authenticated then redirect him to the login page
//     // return res.redirect('login');
// };

//Register the authentication middleware
//router.use('/', isAuthenticated);

router.get('/', function (req, res, next) {
    res.render('Starter', { title: "Super App" });
});

router.get('/test', function (req, res) {
    res.send('test data');
});

router.post('/CreateSurvey', function (req, res) {
    var survey_name = req.body.survey_name;
    var survey_ques = req.body.survey_ques;
    var options = req.body.options;
    var userid = req.body.userid;

    console.log('Survey name: ' + survey_name);
    console.log('Survey Ques:: ' + survey_ques);
    console.log('options:: ' + options);

    var collection = new survey.survey({
        survey_name: survey_name,
        survey_id: getRandomString(),
        user_id: userid,
        created_on: getDateTime()
    });

    collection.save(function (err, dd) {
        if (err) {
            console.log('Database Error: ' + err);
            res.status(500).send({ error: 'Database Error - ' + err });
        } else {
            console.log('Records saved successfully in database');
            //res.send('Records saved successfully in database');

            survey_ques.forEach(function (data) {
                console.log('Survey ques ' + data.ques_text);
                console.log('Ques id: ' + data.ques_id);

                // Saving records on local database//
                var collection = new survey.questions({
                    ques_number: data.ques_id,
                    ques_text: data.ques_text,
                    survey_id: dd.survey_id
                });

                collection.save(function (err, ddd) {
                    if (err) {
                        console.log('Database Error: ' + err);
                        res.status(500).send({ error: 'Database Error - ' + err });
                    } else {
                        console.log('Records saved successfully in database');
                        //res.send('Records saved successfully in database');

                        options.forEach(function (optiondata) {
                            if (optiondata.ques_id != data.ques_id) return;

                            // Saving records on local database//
                            var collection = new survey.ques_options({
                                option_text: optiondata.option_text,
                                ques_id: ddd._id
                            });

                            collection.save(function (err) {
                                if (err) {
                                    console.log('Database Error: ' + err);
                                    res.status(500).send({ error: 'Database Error - ' + err });
                                } else {
                                    console.log('Records saved successfully in database');
                                    //res.send('Records saved successfully in database');
                                }
                            });
                        });
                    }
                });
            });

        }
    });
    res.send('Records saved successfully in database');
    //res.end();
});

router.get('/AllSurvey/:userid', function (req, res) {

    survey.survey.find({
        user_id: req.param('userid')
    }, function (err, data) {
        if (data) {
            res.send(data);
        } else {
            res.status(400).send('Error');
        }
    });
});

module.exports = router;

function getRandomString() {
    //return Math.random().toString(36).substring(7);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    // return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    return day + ":" + month + ":" + year + " " + hour + ":" + min;
}