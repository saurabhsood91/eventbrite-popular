var React = require('react');

var SearchBox = React.createClass({
    render: function() {
        return (
            <div id="search-container">
                <input type="text" id="search-box" className="form-control" placeholder="Search Events..."/>
                <button type="button" className="btn btn-primary" id="btn-search">Search</button>
            </div>
        )
    }
});

module.exports = SearchBox;
