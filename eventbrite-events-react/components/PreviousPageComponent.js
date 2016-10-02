var React = require('react');

var PreviousPageComponent = React.createClass({
    gotoPreviousPage: function() {
        var page = this.props.page;
        if(page == 1) {
            return;
        }
        this.props.changePageCallback(page - 1);
    },
    render: function() {
        return (
            <a className={this.props.page === 1 ? 'col-md-3 disabled-link' : 'col-md-3'} href="#" onClick={this.gotoPreviousPage}>Previous</a>
        );
    }
});

module.exports = PreviousPageComponent;
