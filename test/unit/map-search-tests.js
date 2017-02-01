const test = require('ava');
const mapSearch = require('../../src/js/map-search');

test('When there are no results a message is displayed', assert => {
    const mapped = mapSearch('', 0, []);
    assert.is(mapped.message, 'Sorry, nothing matched your filter term');
});

test('When there are results, no message is displayed', assert => {
    const mapped = mapSearch('wibble', 0, [recipe('wibble')]);
    assert.is(mapped.message, '');
});

test('When a max time is specified, recipes taking less time are returned',
    assert => {
    const expected = recipe('foo', [], 20);
    const mapped = mapSearch('', 25, [
        expected,
        recipe('bar', [], 30)
    ]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
 });

test('When the max time is specified is 0, cooking time is ignored',
    assert => {
    const expected = recipe('foo', [], 20);
    const mapped = mapSearch('foo', 0, [
        expected,
        recipe('bar', [], 30)
    ]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
 });

test('When the name matches, it is added to the results', assert => {
    const expected = recipe('wibble');
    const mapped = mapSearch('wibble', 0, [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('Name filter is insensitive', assert => {
    const expected = recipe('WiBBlE');
    const mapped = mapSearch('wibble', 0, [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('When the name doesn\'t match, it is not added to the results', assert => {
    const mapped = mapSearch('wibble', 0, [
        recipe('wobble')
    ]);
    assert.is(mapped.results.length, 0);
});

test('When the recipe contains the ingredient, it is added to the results', assert => {
    const expected = recipe('foobar', ['Tomato']);
    const mapped = mapSearch('Tomato', 0, [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('Ingredient filter is case insensitive', assert => {
    const expected = recipe('foobar', ['Tomato']);
    const mapped = mapSearch('TomATO', 0, [expected]);
    assert.is(mapped.
results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

function recipe(name, ingredients=[], cookingTime=0) {
    return {name, ingredients, cookingTime};
}
