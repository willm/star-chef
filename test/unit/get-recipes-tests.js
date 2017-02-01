const test = require('ava');
const getRecipes = require('../../src/js/get-recipes');

[undefined, 'a', 'aa', 'aaa'].map(smallSearch => {
    return test(
        'Filtering with less than 3 characters doesn\'t fetch results', assert => {
        const expected = {
            message: '',
            results: []
        };
        return getRecipes(smallSearch, 0, expected)
            .then(mapped => {
                assert.deepEqual(mapped, expected);
            });
    });
});
