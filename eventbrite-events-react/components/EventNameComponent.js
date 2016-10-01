var React = require('react');

var EventNameComponent = React.createClass({
    render: function() {
        return (
            <a href={this.props.eventURL} target="_blank">{this.props.eventName}</a>
        );
    }
});

module.exports = EventNameComponent;
