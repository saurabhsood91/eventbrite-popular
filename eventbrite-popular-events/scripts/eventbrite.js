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
  initialize();
});
