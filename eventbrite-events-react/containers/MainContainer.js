var React = require('react');
var Loader = require('react-loader');

var SearchContainer = require('./SearchContainer');
var TableContainer = require('./TableContainer');
var PaginationContainer = require('./PaginationContainer');

var MainContainer = React.createClass({
    getInitialState: function() {
        return {
            events: [],
            page: 1,
            numberOfPages: 0,
            currentEvent: '',
            loading: false
        }
    },
    changePageCallback: function(pageNumber) {
        this.setState({
            page: pageNumber
        });
        this.getData(this.state.currentEvent, pageNumber);
    },
    getData: function(eventName, page) {
        var self = this;
        var pageNumber = 1;
        if(page) {
            pageNumber = page;
        }
        this.setState({
            loading: true
        });
        console.log(pageNumber);
        $.getJSON('https://www.eventbriteapi.com/v3/events/search', {
            'token': self.token,
            'sort_by': 'date',
            'q': eventName,
            'location.latitude': this.state.location.latitude,
            'location.longitude': this.state.location.longitude,
            'location.within': '50mi',
            'page': pageNumber
        })
        .done(function(data){
            self.setState({
                events: data.events,
                numberOfPages: data.pagination.page_count,
                currentEvent: eventName,
                loading: false
            });
        });
    },
    searchEvents: function(eventName) {
        this.getData(eventName);
    },
    componentDidMount: function() {
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            self.setState({
                location: position.coords
            });
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
                    self.getData();
                  });
                });
              } else {
                // Set token on scope
                self.token = objects.token;
                self.getData();
              }
            });
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
                                <SearchContainer searchCallback={this.searchEvents}/>
                            </div>
                        </div>
                    </div>
                  </div>
                </nav>
                <Loader loaded={!this.state.loading} />
                <TableContainer events={this.state.events}/>
                <PaginationContainer changePageCallback={this.changePageCallback} page={this.state.page} numberOfPages={this.state.numberOfPages}/>
            </div>
        )
    }
});

module.exports = MainContainer;
