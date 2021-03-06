/*
MainController
Handles the interaction with the UI
Depends on angularSpinner module
Uses the EventbriteAPIService to make calls to the EventbriteAPI
*/

angular.module('eventbrite', ['angularSpinner'])
.controller('MainController', ['EventbriteAPIService', function(EventbriteAPIService){
  var self = this;
  self.currentPage = 0;
  self.locationQuery = '';
  self.hasData = false;
  self.showSpinner = false;
  self.selectedDist = "10mi";

  // Bootstraps the controller
  // Handles getting the OAuth token from either local storage or from Eventbrite API
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

  // Runs when the checkbox for current location is checked
  // Uses HTML5 geolocation to get the current location and uses it to make API calls
  self.getLocationEvents = function() {
    if(self.isLocationRadio) {
      var geolocation = navigator.geolocation;
      geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var miles = self.selectedDist;
        self.coords = position.coords;
        self.showSpinner = true;
        EventbriteAPIService.getPopularEventsByCoords(lat, long, miles, 0, self.token, self.showData);
      }, function(err){
        console.log(err);
      });
    }
  };

  // Runs when the threshold distance for events is selected, provided that the Geolocation is being used
  self.changeDist = function() {
    if(self.isLocationRadio) {
      self.showSpinner = true;
      EventbriteAPIService.getPopularEventsByCoords(self.coords.latitude, self.coords.longitude, self.selectedDist, 0, self.token, self.showData);
    }
  }

  // Used to get a particular page in the list of events
  self.getEvents = function(page) {
    if(self.isLocationRadio) {
      // Get next page of current location
      self.showSpinner = true;
      EventbriteAPIService.getPopularEventsByCoords(self.coords.latitude, self.coords.longitude, self.selectedDist, page, self.token, self.showData);
    } else {
      self.getPopularEvents(page);
    }
  };

  // Callback function to set the data and show it in the table
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
        // To mark as coming weekend
        var next_days = 7 * 24 * 3600 * 1000;
        var day = new_date.getDay();
        if(diff < next_days && (day === 0 || day == 6)) {
          event.isOnComingWeekend = true;
        }
      }
    }
  };

  // Runs when a query is searched
  self.getPopularEvents = function(page) {
    // Show Spinner
    self.showSpinner = true;
    // Get list of Popular events
    EventbriteAPIService.getPopularEvents(self.locationQuery, self.token, page, self.showData);
  };
  initialize();
}]);
