(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) 
{
  //default state is no list/no text/red font
  $scope.foodList = "";
  $scope.textColor = "red";
  $scope.foodState = "";

  $scope.foodConditionFont = function () {
    // Enjoy/Too much    --> Green
    // Please enter data --> red
    var color = "";
    switch ($scope.foodState) 
    {
       case "Enjoy!":
        color = "green";
       break;

       case "Too Much!":
        color = "green";
       break;

       default:
        color = "red";
       break;    
    }
    $scope.textColor = color;
  };

  $scope.checkTooMuch = function () {
    // split on comma, removing empties
    // if empty --> "Please Enter data first"
    // if <= 3 --> "Enjoy"
    // if > 3  --> "Too Much!"
    var message = "Too Much!";
    var filteredFoodList = $scope.foodList.split(',').filter(function(tag) {
      // Return true for non-empty and non-whitespace-only strings
      return tag.trim().length > 0;
    });
    
    var foodCount = filteredFoodList.length;
    if (foodCount == 0)
    {
       message = "Please Enter data first";       
    }
    else if (foodCount <= 3)
    {
       message = "Enjoy!"
    }    
    $scope.foodState = message;
    $scope.foodConditionFont();
  };
}

})();