require('whatwg-fetch');
const mapSearch = require('./map-search');

module.exports = function getRecipes(q, time, defaultState) {
    if (time > 0 || q && q.length > 3) {
        return fetch('/build/api/recipes.json')
            .then(response => response.json())
            .then(results => {
                return mapSearch(q, time, results);
            });
    }
    return Promise.resolve(defaultState);
};
