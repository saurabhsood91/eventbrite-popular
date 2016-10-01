var React = require('react');

var SearchBox = React.createClass({
    searchEvents: function() {
        var eventName = $('#search-box').val();
        this.props.searchCallback(eventName);
    },
    render: function() {
        return (
            <div id="search-container">
                <input type="text" ref="eventNameText" id="search-box" className="form-control" placeholder="Search Events..."/>
                <button type="button" className="btn btn-primary" id="btn-search" onClick={this.searchEvents}>Search</button>
            </div>
        )
    }
});

module.exports = SearchBox;
