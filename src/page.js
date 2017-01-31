const React = require('react');
const SearchForm = require('./search-form');

module.exports = React.createClass({
    render: function () {
        return <div className="container">
            <h1>Star Chef</h1>
            <SearchForm/>
        </div>
    }
});
