var React = require('react');
var EventComponent = require('../components/EventComponent');

var TableComponent = React.createClass({
    getInitialState: function() {
        return {
            events: [
                {
                    name: 'Some Sample Event',
                    date: '8/16/2016',
                    price: '$150'
                },
                {
                    name: 'Some Sample Event 2',
                    date: '9/16/2016',
                    price: 'Free'
                }
            ]
        };
    },
    eachEvent: function(event, i) {
        return (
            <EventComponent
                eventName={event.name}
                eventDate={event.date}
                eventPrice={event.price}
            />
        );
    },
    render: function() {
        return (
            <table>
                <thead>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Price</th>
                </thead>
                <tbody>
                    {this.state.events.map(this.eachEvent)}
                </tbody>
            </table>
        );
    }
});

module.exports = TableComponent;
