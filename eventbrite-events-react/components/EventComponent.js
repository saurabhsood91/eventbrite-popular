var React = require('react');

var EventComponent = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.eventName}</td>
                <td>{this.props.eventDate}</td>
                <td>{this.props.eventPrice}</td>
            </tr>
        );
    }
});

module.exports = EventComponent;
