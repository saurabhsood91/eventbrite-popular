angular.module('eventbrite')
.service('EventbriteAPIService', ['$http', function($http){
  var getPopularEvents = function(location, token, page, callback) {
    // Logic goes here
    var url = "https://www.eventbriteapi.com/v3/events/search";
    $http.get(url, {
      params: {
        'token': token,
        'popular': true,
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

  var getPopularEventsByCoords = function(lat, lng, miles, page, token, callback) {
    // Logic goes here
    var url = "https://www.eventbriteapi.com/v3/events/search";
    $http.get(url, {
      params: {
        'token': token,
        'popular': true,
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
