require('whatwg-fetch');
const mapSearch = require('./map-search');

module.exports = function getRecipes(q, defaultState) {
    if (q.length < 4) {
        return Promise.resolve(defaultState);
    }
    return fetch('/build/api/recipes.json')
        .then(response => response.json())
        .then(results => {
            return mapSearch(q, results);
        });
};
