var React = require('react');
var ReactDOM = require('react-dom');

var SearchContainer = require('../containers/SearchContainer');
var TableContainer = require('../containers/TableContainer');

var MainContainer = React.createClass({
    getInitialData: function() {
        // Get initial data
        var self = this;
        $.getJSON('https://www.eventbriteapi.com/v3/events/search', {
            'token': self.token,
            'sort_by': 'date'
        })
        .done(function(data){
            console.log(data);
            // TODO Set the data
        });
    },
    componentWillMount: function() {
        var self = this;
        chrome.storage.local.get('token', function(objects){
          if(objects.token === undefined) {
            chrome.identity.launchWebAuthFlow({
              'url': 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=V52WWQLQ73NY5OUXUP',
              'interactive': true
            },function(redirect_url) {
              self.token = redirect_url.split("&")[1].split("=")[1];
              // Set the token to local storage
              chrome.storage.local.set({
                'token': self.token
              }, function(){
                console.log('Token Saved');
                self.getInitialData();
              });
            });
          } else {
            // Set token on scope
            self.token = objects.token;
            self.getInitialData();
          }
        });
    },
    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="row">
                            <div className="col-md-7">
                                <a className="navbar-brand" href="#">
                                  <img src="images/Eventbrite-logo.png" />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <SearchContainer />
                            </div>
                        </div>
                    </div>
                  </div>
                </nav>
                <TableContainer />
            </div>
        )
    }
});

ReactDOM.render(
    <MainContainer />,
    document.getElementById('app')
);
