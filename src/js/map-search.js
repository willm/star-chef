function containsIngredient(ingredient, result) {
    return result.ingredients
        .filter(
            i => i.match(ingredient)
        ).length > 0;
}

function isWithinCookingTime(time, result) {
    return time === 0 ?
        true :
        result.cookingTime <= time;
}

module.exports = function mapSearch (q, maxTime, results) {
    const caseInsensitiveSearch = new RegExp(q, 'i');
    const filtered = results.filter(result => {
        return isWithinCookingTime(maxTime, result) && (
            result.name.match(caseInsensitiveSearch) ||
            containsIngredient(caseInsensitiveSearch, result)
        );
    });
    return {
        message: filtered.length ?
            '':
            'Sorry, nothing matched your filter term',
        results: filtered
    };
};
