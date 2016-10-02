var React = require('react');

var NextPageComponent = React.createClass({
    gotoNextPage: function() {
        var page = this.props.page;
        if(page === this.props.numberOfPages) {
            return;
        }
        this.props.changePageCallback(page + 1);
    },
    render: function() {
        return (
            <a href="#" onClick={this.gotoNextPage}>&gt;</a>
        );
    }
});

module.exports = NextPageComponent;
