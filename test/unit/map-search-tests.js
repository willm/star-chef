const test = require('ava');
const mapSearch = require('../../src/map-search');

test('When there are no results a message is displayed', assert => {
    const mapped = mapSearch('', []);
    assert.is(mapped.message, 'Sorry, nothing matched your filter term');
});

test('When there are results, no message is displayed', assert => {
    const mapped = mapSearch('wibble', [{name: 'wibble'}]);
    assert.is(mapped.message, '');
});

test('When the name matches, it is added to the results', assert => {
    const expected = {name: 'wibble'};
    const mapped = mapSearch('wibble', [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('When the name matches are case insensitive', assert => {
    const expected = {name: 'WiBBlE'};
    const mapped = mapSearch('wibble', [expected]);
    assert.is(mapped.results.length, 1);
    assert.deepEqual(mapped.results, [expected]);
});

test('When the name doesn\'t match, it is not added to the results', assert => {
    const expected = {name: 'wibble'};
    const mapped = mapSearch('wibble', [
        {name: 'wobble'}
    ]);
    assert.is(mapped.results.length, 0);
});
