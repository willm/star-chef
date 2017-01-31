const React = require('react');
require('whatwg-fetch');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            q: '',
            results: []
        }
    },
    handleChange: function (event) {
        this.setState({q: event.target.value});
    },
    render: function () {
        return <div>
            <div id="message">{this.state.message}</div>
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" name=""
                    id="q" onChange={this.handleChange}/>
                <button type="submit">Go!</button>
            </form>
            <div>
                {this.state.results.map(r => <p className="search-result">{r.name}</p>)}
            </div>
        </div>
    },
    handleSubmit: function (event) {
        fetch('/build/api/recipes.json')
            .then(response => response.json())
            .then(results => {
                const filtered = results.filter(result => {
                    return result.name.match(new RegExp(this.state.q));
                });
                this.setState({
                    message: 'Sorry, nothing matched your filter term',
                    results: filtered
                });
            });
        event.preventDefault();
    }
});
