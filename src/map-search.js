module.exports = function mapSearch (q, results) {
    const filtered = results.filter(result => {
        return result.name.match(new RegExp(q));
    });
    return {
        message: 'Sorry, nothing matched your filter term',
        results: filtered
    };
}
