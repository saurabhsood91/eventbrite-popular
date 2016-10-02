var React = require('react');

var SearchBox = React.createClass({
    getInitialState: function() {
        return {
            btnIsEnabled: false
        };
    },
    searchEvents: function() {
        var eventName = $('#search-box').val();
        if(eventName === ''){
            return;
        }
        this.props.searchCallback(eventName);
    },
    handleKeyUp: function(event) {
        var enteredText = $('#search-box').val();
        if(enteredText === '') {
            this.setState({
                btnIsEnabled: false
            });
        } else {
            if(event.key === 'Enter') {
                this.searchEvents();
            } else if(!this.state.btnIsEnabled) {
                this.setState({
                    btnIsEnabled: true
                });
            }
        }
    },
    render: function() {
        return (
            <div id="search-container">
                <input type="text" ref="eventNameText" id="search-box" className="form-control" placeholder="Search Events..." onKeyUp={this.handleKeyUp}/>
                <button type="button" className="btn btn-primary" id="btn-search" onClick={this.searchEvents} disabled={!this.state.btnIsEnabled}>Search</button>
            </div>
        )
    }
});

module.exports = SearchBox;
