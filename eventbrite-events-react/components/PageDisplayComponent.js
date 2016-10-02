var React = require('react');

var PageDisplayContainer = React.createClass({
    render: function() {
        return (
            <span>
                Page: {this.props.page}
            </span>
        );
    }
});

module.exports = PageDisplayContainer;
