$(function(){
  $('#btnAuth').click(function(){
    chrome.identity.launchWebAuthFlow({
      'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=TTNJP3XC3TXKXN625J',
      'interactive': true
    },function(redirect_url) {
      alert(redirect_url);
    });
  });
});
