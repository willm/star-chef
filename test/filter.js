require('chromedriver')
const test = require('ava');
const selenium = require('selenium-webdriver');
const Builder = selenium.Builder;
const By = selenium.By;
let browser;

function WhenTheFilterTermLasagneIsEntered() {
    browser.get('http://localhost:8000');
    const form = browser.findElement(By.css('form'));
    const searchBox = form.findElement(By.css('#q'))
        .then(searchBox => searchBox.sendKeys('Lasagne'))
        .then(form.submit());
}

function TheNothingMatchedYourFilterTermMessageIsDisplayed(assert) {
    return browser.findElement(By.css('#message'))
        .then(message => message.getText())
        .then(text => assert.is(text, 'Sorry, nothing matched your filter term'));
}

test.beforeEach(t => {
    browser = new Builder()
        .forBrowser('chrome')
        .build();
});

test('No results', assert => {
    WhenTheFilterTermLasagneIsEntered();
    return TheNothingMatchedYourFilterTermMessageIsDisplayed(assert);
});

test.after.always(t => {
    return browser.quit();
});

