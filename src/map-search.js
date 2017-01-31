module.exports = function mapSearch (q, results) {
    const caseInsensitiveSearch = new RegExp(q, 'i');
    const filtered = results.filter(result => {
        return q != '' &&
            result.name.match(caseInsensitiveSearch) ||
            result.ingredients
                .filter(
                    i => i.match(caseInsensitiveSearch)
                ).length > 0;
    });
    return {
        message: filtered.length ?
            '':
            'Sorry, nothing matched your filter term',
        results: filtered
    };
};
