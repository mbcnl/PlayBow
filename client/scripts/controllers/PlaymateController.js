angular.module('myApp').controller('PlaymateController', ['$scope', '$http', function($scope, $http) {
  console.log('paws on AddPlaymateController');
  $scope.allPlaymates = [];
  $scope.favePlaymates = [];

  ////////////////////////////////////////////////////////////
  //             SEND NEW PLAYMATES TO SERVER               //
  ////////////////////////////////////////////////////////////

  // collect data for new playmate and send to server
  $scope.addPlaymate = function(){
    event.preventDefault();
    console.log('addPlaymate button clicked');

    // get the input and store in object
    var playmateToSend = {
      name: $scope.nameIn,
      breed: $scope.breedIn,
      age: $scope.ageIn,
      gender: $scope.genderIn,
      sterile: $scope.sterileIn,
      vaccinated: $scope.vaccinatedIn
    }; // end playmateToSend

    console.log('sending to server:', playmateToSend);

    // post route to send new data to server
    $http({
      method: 'POST',
      url: '/addPlaymate',
      data: playmateToSend
    }).then(function() {
      $scope.displayPlaymates();
    }); // end post route

    // clears input fields
    $scope.nameIn = '';
    $scope.breedIn = '';
    $scope.ageIn = '';
    $scope.genderIn = '';
    $scope.sterileIn = '';
    $scope.vaccinatedIn = '';
  }; // end addPlaymate

  // get route to retrieve data from server to display
  $scope.displayPlaymates = function() {
    // retrieve data from server
    $http({
      method: 'GET',
      url: '/getPlaymates'
    }).then(function(response) {
      $scope.allPlaymates = response.data;
      console.log('so many new furiends!', response.data);
    }, function myError (response) {
      console.log(response.statusText);
    });
  }; // end displayPlaymates
  $scope.displayPlaymates();

  ////////////////////////////////////////////////////////////
  //             SEND FAVORITES TO SERVER                   //
  ////////////////////////////////////////////////////////////

  // send selected favorites to the database
  $scope.addFave = function(index){
    console.log('addFave button clicked');
    var faveToSend = {
      name: $scope.allPlaymates[index].name,
      breed: $scope.allPlaymates[index].breed,
      age: $scope.allPlaymates[index].age,
      gender: $scope.allPlaymates[index].gender,
      sterile: $scope.allPlaymates[index].sterile,
      vaccinated: $scope.allPlaymates[index].vaccinated
    };
    console.log('sending fave to server:', faveToSend);
    // post route to send fave to server
    $http({
      method: 'POST',
      url: '/addFave',
      data: faveToSend
    }).then(function() {
      $scope.displayFaves();
    }); // end post route
  }; // end addFave

  // get route to retrieve faves from server to display
  $scope.displayFaves = function() {
    // retrieve data from server
    $http({
      method: 'GET',
      url: '/getFaves'
    }).then(function(response) {
      $scope.favePlaymates = response.data;
      console.log('so many fave furiends!', response.data);
    }, function myError (response) {
      console.log(response.statusText);
    });
  }; // end displayPlaymates
  $scope.displayFaves();


}]);
