var React = require('react');
var ReactDOM = require('react-dom');

var MainContainer = React.createClass({
    render: function() {
        return (
            <div>
                Eventbrite Stuff
            </div>
        )
    }
});

ReactDOM.render(
    <MainContainer />,
    document.getElementById('app')
);
