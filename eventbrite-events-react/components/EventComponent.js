var React = require('react');
var EventNameComponent = require('../components/EventNameComponent');

var EventComponent = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <EventNameComponent
                        eventName={this.props.eventName}
                        eventURL={this.props.eventURL} />
                </td>
                <td>{this.props.eventDate}</td>
                <td>{this.props.eventTime}</td>
            </tr>
        );
    }
});

module.exports = EventComponent;
