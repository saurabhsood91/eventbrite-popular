chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('../popup.html',
    {
      "id": "index",
      "state": "maximized"
    });
});
