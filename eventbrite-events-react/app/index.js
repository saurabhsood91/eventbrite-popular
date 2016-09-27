var React = require('react');
var ReactDOM = require('react-dom');

var SearchContainer = require('../containers/SearchContainer');

var MainContainer = React.createClass({
    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="row">
                            <div className="col-md-7">
                                <a className="navbar-brand" href="#">
                                  <img src="images/Eventbrite-logo.png" />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <SearchContainer />
                            </div>
                        </div>
                    </div>
                  </div>
                </nav>
            </div>
        )
    }
});

ReactDOM.render(
    <MainContainer />,
    document.getElementById('app')
);
