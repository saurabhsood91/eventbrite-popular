var React = require('react');
var EventComponent = require('../components/EventComponent');

var TableComponent = React.createClass({
    getInitialState: function() {
        return {
            events: []
        };
    },
    eachEvent: function(e, i) {
        var dateParts = e.start.local.split('T');
        return (
            <EventComponent
                key={i}
                eventName={e.name.html}
                eventDate={dateParts[0]}
                eventTime={dateParts[1]}
                eventURL={e.url}
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
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.events.map(this.eachEvent)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = TableComponent;
