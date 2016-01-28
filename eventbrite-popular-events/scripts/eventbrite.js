// $(function(){
//   chrome.identity.launchWebAuthFlow({
//     'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=TTNJP3XC3TXKXN625J',
//     'interactive': true
//   },function(redirect_url) {
//     alert(redirect_url);
//   });
// });
angular.module('eventbrite', [])
.controller('MainController', ['EventbriteAPIService', function(EventbriteAPIService){
  var self = this;
  self.locationQuery = '';
  self.hasData = false;
  var initialize = function() {
    // See if you can store token in local storage
    // Else retrieve through OAuth flow
    chrome.storage.local.get('token', function(objects){
      if(objects.token === undefined) {
        chrome.identity.launchWebAuthFlow({
          'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=TTNJP3XC3TXKXN625J',
          'interactive': true
        },function(redirect_url) {
          self.token = redirect_url.split("&")[1].split("=")[1];
          // Set the token to local storage
          chrome.storage.local.set({
            'token': self.token
          }, function(){
            console.log('Token Saved');
          });
        });
      } else {
        // Set token on scope
        self.token = objects.token
      }
    });
  };
  self.getPopularEvents = function() {
    // Get list of Popular events
    EventbriteAPIService.getPopularEvents(self.locationQuery, self.token, function(data) {
      // TODO validate the data
      self.eventData = data;
      self.hasData = true;
    });
  };
  initialize();
}])
.service('EventbriteAPIService', ['$http', function($http){
  var getPopularEvents = function(location, token, callback) {
    // Logic goes here
    var url = "https://www.eventbriteapi.com/v3/events/search";
    $http.get(url, {
      params: {
        'token': token,
        'popular': true,
        'venue.city': location
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
    getPopularEvents: getPopularEvents
  }
}]);
