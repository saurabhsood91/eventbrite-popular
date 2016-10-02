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
            <a className={this.props.page === this.props.numberOfPages ? "col-md-3 disabled-link" : "col-md-3"} href="#" onClick={this.gotoNextPage}>Next</a>
        );
    }
});

module.exports = NextPageComponent;
