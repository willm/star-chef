const React = require('react');
const mapSearch = require('../map-search');
const getRecipes = require('../get-recipes');
const defaultState = {message: '', results: []};

module.exports = React.createClass({
    getInitialState: function () {
        return defaultState;
    },
    handleChange: function (event) {
        this.setState({q: event.target.value});
    },
    render: function () {
        return <div className="container">
            <form className="search-form" role="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="q">filter</label>
                        <input
                            type="text" name="q"
                            className="form-control input-lg"
                            id="q" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-default">Go!</button>
                </div>
            </form>
            <div id="message" className={
                "row " + (this.state.message ? 'alert alert-warning' : '')
            }>
                {this.state.message}
            </div>
            <div>
                {
                    this.state.results
                        .map(r => <div
                             className="alert alert-info row search-result"
                             key={r.name}>{r.name}
                        </div>)
                }
            </div>
        </div>
    },
    handleSubmit: function (event) {
        getRecipes(this.state.q, defaultState)
            .then(mappedSearch => this.setState(mappedSearch));
        event.preventDefault();
    }
});
