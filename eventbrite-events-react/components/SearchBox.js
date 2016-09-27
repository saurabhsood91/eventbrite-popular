var React = require('react');

var SearchBox = React.createClass({
    render: function() {
        return (
            <input type="text" id="search-box" className="form-control" />
        )
    }
});

module.exports = SearchBox;
