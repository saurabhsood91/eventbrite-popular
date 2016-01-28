// $(function(){
//   chrome.identity.launchWebAuthFlow({
//     'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=TTNJP3XC3TXKXN625J',
//     'interactive': true
//   },function(redirect_url) {
//     alert(redirect_url);
//   });
// });
angular.module('eventbrite', [])
.controller('MainController', function(){
  var self = this;
  var initialize = function() {
    // See if you can store token in local storage
    // Else retrieve through OAuth flow
    chrome.identity.launchWebAuthFlow({
      'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=TTNJP3XC3TXKXN625J',
      'interactive': true
    },function(redirect_url) {
      self.token = redirect_url.split("&")[1].split("=")[1];
    });
  };
  initialize();

});
