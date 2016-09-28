var React = require('react');
var EventComponent = require('../components/EventComponent');

var TableComponent = React.createClass({
    getInitialState: function() {
        return {
            events: [
                {
                    name: 'Some Sample Event',
                    date: '8/16/2016',
                    price: '$150',
                    id: 1
                },
                {
                    name: 'Some Sample Event 2',
                    date: '9/16/2016',
                    price: 'Free',
                    id: 2
                }
            ]
        };
    },
    eachEvent: function(event, i) {
        return (
            <EventComponent
                key={event.id}
                eventName={event.name}
                eventDate={event.date}
                eventPrice={event.price}
            />
        );
    },
    render: function() {
        return (
            <div className="scroll-table">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map(this.eachEvent)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = TableComponent;
