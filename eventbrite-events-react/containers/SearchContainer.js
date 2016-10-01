var React = require('react');
var SearchBox = require('../components/SearchBox');

var SearchContainer = React.createClass({
    render: function() {
        return (
            <SearchBox searchCallback={this.props.searchCallback}/>
        )
    }
});

module.exports = SearchContainer;
