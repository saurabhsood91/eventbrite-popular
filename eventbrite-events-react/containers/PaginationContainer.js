var React = require('react');

var PreviousPageComponent = require('../components/PreviousPageComponent');
var PageDisplayComponent = require('../components/PageDisplayComponent')
var NextPageComponent = require('../components/NextPageComponent');

var PaginationContainer = React.createClass({
    render: function() {
        return (
            <div className="container footer">
                <nav>
                    <PreviousPageComponent changePageCallback={this.props.changePageCallback} page={this.props.page}/>
                    <PageDisplayComponent page={this.props.page}/>
                    <NextPageComponent changePageCallback={this.props.changePageCallback} page={this.props.page} numberOfPages={this.props.numberOfPages}/>
                </nav>
            </div>
        );
    }
});

module.exports = PaginationContainer;
