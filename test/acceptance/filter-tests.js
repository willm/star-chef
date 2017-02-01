const test = require('ava');
const FilterSteps = require('./steps/filter-steps');
let steps;

test('No results', assert => {
    steps = new FilterSteps(assert);
    return steps.WhenTheFilterTermLasagneIsEntered()
        .TheNothingMatchedYourFilterTermMessageIsDisplayed();
});

test('Filter results by name', assert => {
    steps = new FilterSteps(assert);
    return steps.WhenTheFilterTermChickenIsEntered()
        .ThenTheFollowingRecipesAreDisplayed(
            'Lemon Chicken',
            'Chicken Caesar Salad'
        );
});

test('Filter results by ingredient', assert => {
    steps = new FilterSteps(assert);
    return steps.WhenTheFilterTermLettuceIsEntered()
        .ThenTheFollowingRecipesAreDisplayed(
            'Chicken Caesar Salad'
        );
});

test('Filter results by cooking time', assert => {
    steps = new FilterSteps(assert);
    return steps.WhenTheMaximumCookingTime25MinutesIsSelected()
        .ThenTheFollowingRecipesAreDisplayed(
            'Chicken Caesar Salad'
        );
});

test.after.always(t => {
    return steps.browser.quit();
});

