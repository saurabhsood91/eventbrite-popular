// $(function(){
//   chrome.identity.launchWebAuthFlow({
//     'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=TTNJP3XC3TXKXN625J',
//     'interactive': true
//   },function(redirect_url) {
//     alert(redirect_url);
//   });
// });
angular.module('eventbrite', ['angularSpinner'])
.controller('MainController', ['EventbriteAPIService', function(EventbriteAPIService){
  var self = this;
  self.locationQuery = '';
  self.hasData = false;
  self.showSpinner = false;
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
    // Show Spinner
    self.showSpinner = true;
    // Get list of Popular events
    EventbriteAPIService.getPopularEvents(self.locationQuery, self.token, function(data) {
      // TODO validate the data
      self.eventData = data;
      self.hasData = true;
      self.showSpinner = false;

      for(var i = 0; i < self.eventData.events.length; i++) {
        // get the time attribute
        var event = self.eventData.events[i];
        event.isOnComingWeekend = false;
        // var date_time = event.start.local.split("T");
        // var dp = date_time[0].split("-");
        // var tp = date_time[1].split(":");
        var new_date = new Date(event.start.utc);
        console.log(new_date);
        // Add it to the data object
        var event_time = new_date.getTime();
        // Get current time
        var time_now = new Date().getTime();
        // Get difference of the times
        var diff = event_time - time_now;
        // Can do actual weekend calculation here
        if(diff > 0) {
          // if within the next 7 days and on a saturday and sunday
          var next_days = 7 * 24 * 3600 * 1000;
          var day = new_date.getDay();
          if(diff < next_days && (day === 0 || day == 6)) {
            event.isOnComingWeekend = true;
          }
        }
      }

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
        'venue.city': location,
        'sort_by': 'date'
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
