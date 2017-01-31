require('chromedriver')
const selenium = require('selenium-webdriver');
const By = selenium.By;
const Builder = selenium.Builder;

class FilterSteps{
    constructor(assert) {
        this.browser = new Builder()
            .forBrowser('chrome')
            .build();
        this.assert = assert;
    }

    searchFor(term) {
        this.browser.get('http://localhost:8000');
        const form = this.browser.findElement(By.css('form'));
        const searchBox = form.findElement(By.css('#q'))
            .then(searchBox => searchBox.sendKeys(term))
            .then(form.submit());
        return this;
    }

    WhenTheFilterTermLasagneIsEntered() {
        return this.searchFor('Lasagne');
    }

    WhenTheFilterTermChickenIsEntered() {
        return this.searchFor('Chicken');
    }

    ThenTheFollowingRecipesAreDisplayed(...expectedRecipes) {
        return this.browser.findElements(By.css('.search-result'))
            .then(results => {
                this.assert.is(
                    expectedRecipes.length,
                    results.length,
                    `expected ${expectedRecipes.length} recipes`
                );
            });
    }

    TheNothingMatchedYourFilterTermMessageIsDisplayed() {
        return this.browser.findElement(By.css('#message'))
            .then(message => message.getText())
            .then(text => this.assert.is(text, 'Sorry, nothing matched your filter term'));
    }
}

module.exports = FilterSteps;