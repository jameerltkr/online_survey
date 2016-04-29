//main controller
main.controller("MainController", function ($scope, $location) {
    $scope.ABC = "ABC";
    $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
  
  $scope.redirect = function(){
  	console.log('hi');
  	$location.path('/SurveyForm');
  	
  }
    
});
