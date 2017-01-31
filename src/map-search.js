module.exports = function mapSearch (q, results) {
    const filtered = results.filter(result => {
        return result.name.match(new RegExp(q, 'i')) ||
            result.ingredients.indexOf(q) != -1;
    });
    return {
        message: filtered.length ?
            '':
            'Sorry, nothing matched your filter term',
        results: filtered
    };
};
