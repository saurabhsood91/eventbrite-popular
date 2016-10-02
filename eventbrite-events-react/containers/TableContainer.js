var React = require('react');
var TableComponent = require('../components/TableComponent');

var TableContainer = React.createClass({
    render: function() {
        return (
            <TableComponent events={this.props.events}/>
        )
    }
});

module.exports = TableContainer;
