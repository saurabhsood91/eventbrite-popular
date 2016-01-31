angular.module('eventbrite', ['angularSpinner'])
.controller('MainController', ['EventbriteAPIService', function(EventbriteAPIService){
  var self = this;
  self.currentPage = 0;
  self.locationQuery = '';
  self.hasData = false;
  self.showSpinner = false;
  self.selectedDist = "10mi";
  // self.isLocationRadio = false;
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
        self.token = objects.token;
      }
    });
  };

  self.getLocationEvents = function() {
    if(self.isLocationRadio) {
      var geolocation = navigator.geolocation;
      geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var miles = "10mi";
        self.coords = position.coords;
        self.showSpinner = true;
        EventbriteAPIService.getPopularEventsByCoords(lat, long, miles, 0, self.token, self.showData);
      }, function(err){
        console.log(err);
      });
    }
  };

  self.changeDist = function() {
    self.showSpinner = true;
    EventbriteAPIService.getPopularEventsByCoords(self.coords.latitude, self.coords.longitude, self.selectedDist, 0, self.token, self.showData);
  }

  self.getEvents = function(page) {
    if(self.isLocationRadio) {
      // Get next page of current location
      self.showSpinner = true;
      EventbriteAPIService.getPopularEventsByCoords(self.coords.latitude, self.coords.longitude, self.selectedDist, page, self.token, self.showData);
    } else {
      self.getPopularEvents(page);
    }
  };

  self.showData = function(data) {
    // TODO validate the data
    self.eventData = data;
    // Store the page count
    self.pages = [];
    for(var i = 1; i <= data.pagination.page_count; i++) {
      self.pages.push(i);
    }
    self.hasData = true;
    self.showSpinner = false;

    for(var i = 0; i < self.eventData.events.length; i++) {
      // get the time attribute
      var event = self.eventData.events[i];
      event.isOnComingWeekend = false;
      var new_date = new Date(event.start.utc);
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
  };

  self.getPopularEvents = function(page) {
    // Show Spinner
    self.showSpinner = true;
    // Get list of Popular events
    EventbriteAPIService.getPopularEvents(self.locationQuery, self.token, page, self.showData);
  };
  initialize();
}])
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
