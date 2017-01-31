const test = require('ava');
const mapSearch = require('../../src/map-search');

test('When there are no results a message is displayed', assert => {
    const mapped = mapSearch('', []);
    assert.is(mapped.message, 'Sorry, nothing matched your filter term');
});

test('When there are results, no message is displayed', assert => {
    const mapped = mapSearch('wibble', [recipe('wibble')]);
    assert.is(mapped.message, '');
});

test('When the name matches, it is added to the results', assert => {
    const expected = recipe('wibble');
    const mapped = mapSearch('wibble', [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('When the name matches are case insensitive', assert => {
    const expected = recipe('WiBBlE');
    const mapped = mapSearch('wibble', [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('When the name doesn\'t match, it is not added to the results', assert => {
    const mapped = mapSearch('wibble', [
        recipe('wobble')
    ]);
    assert.is(mapped.results.length, 0);
});

test('When the recipe contains the ingredient, it is added to the results', assert => {
    const expected = recipe('foobar', ['Tomato']);
    const mapped = mapSearch('Tomato', [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

function recipe(name, ingredients=[]) {
    return {name, ingredients};
}
