/*
Angular service to make HTTP calls to the Eventbrite API
*/

angular.module('eventbrite')
.service('EventbriteAPIService', ['$http', function($http){
  // Hits the Events API of Eventbrite when a location address is passed as a parameter
  var getPopularEvents = function(location, token, page, callback) {
    // Logic goes here
    var url = "https://www.eventbriteapi.com/v3/events/search";
    $http.get(url, {
      params: {
        'token': token,
        'location.address': location,
        'sort_by': 'date',
        'page': page
      }
    })
    .success(function(data){
      console.log(data);
      // Pass data back to the controller
      callback(data);
    })
    .error(function(err) {
      console.log(err);
    });
  };

  // Hits the Events API of Eventbrite when lat and long are passed as parameters
  var getPopularEventsByCoords = function(lat, lng, miles, page, token, callback) {
    // Logic goes here
    var url = "https://www.eventbriteapi.com/v3/events/search";
    $http.get(url, {
      params: {
        'token': token,
        'location.latitude': lat,
        'location.longitude': lng,
        'location.within': miles,
        'sort_by': 'date',
        'page': page
      }
    })
    .success(function(data){
      console.log(data);
      // Pass data back to the controller
      callback(data);
    })
    .error(function(err) {
      console.log(err);
    });
  };

  return {
    getPopularEvents: getPopularEvents,
    getPopularEventsByCoords: getPopularEventsByCoords
  }
}]);
