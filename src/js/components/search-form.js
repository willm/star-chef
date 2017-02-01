const React = require('react');
const mapSearch = require('../map-search');
const getRecipes = require('../get-recipes');
const defaultState = {
    message: '',
    results: [],
    q: '',
    time: 0
};

module.exports = React.createClass({
    getInitialState: function () {
        return defaultState;
    },
    handleChange: function (event) {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
    },
    render: function () {
        return <div className="container">
            <form className="search-form" role="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="q">Ingredient or Name</label>
                        <input
                            type="text" name="q"
                            className="form-control input-lg"
                            placeholder="Filter"
                            id="q"
                            name="q"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Cooking Time</label>
                        <select
                            className="form-control input-lg"
                            id="time"
                            name="time"
                            onChange={this.handleChange}
                        >
                            <option value="0">any</option>
                            <option value="15">15 Minutes</option>
                            <option value="20">20 Minutes</option>
                            <option value="25">25 Minutes</option>
                            <option value="30">30 Minutes</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-lg btn-default">Find My Recipe</button>
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
        getRecipes(this.state.q, Number(this.state.time), defaultState)
            .then(mappedSearch => this.setState(mappedSearch));
        event.preventDefault();
    }
});
