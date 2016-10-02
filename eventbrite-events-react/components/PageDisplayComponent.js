var React = require('react');

var PageDisplayContainer = React.createClass({
    render: function() {
        return (
            <span className="col-md-6">
                Page: {this.props.page}
            </span>
        );
    }
});

module.exports = PageDisplayContainer;
