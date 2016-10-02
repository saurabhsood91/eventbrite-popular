var React = require('react');

var PreviousPageComponent = React.createClass({
    gotoPreviousPage: function() {
        var page = this.props.page;
        if(page <= 1) {
            return;
        }
        this.props.changePageCallback(page - 1);
    },
    render: function() {
        return (
            <a href="#" onClick={this.gotoPreviousPage}>&lt;</a>
        );
    }
});

module.exports = PreviousPageComponent;
