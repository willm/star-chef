const React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {q: ''}
    },
    handleChange: function (event) {
        this.setState({q: event.target.value});
    },
    render: function () {
        return <div>
            <div id="message">{this.state.message}</div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="" id="q" onChange={this.handleChange}/>
                <button type="submit">Go!</button>
            </form>
        </div>
    },
    handleSubmit: function (event) {
        this.setState({message: 'Sorry, nothing matched your filter term'});
        event.preventDefault();
    }
});
