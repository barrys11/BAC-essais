const {Builder,By,Key,Util} = require('selenium-webdriver');
const script = require('jest');
const { beforeAll } = require('@jest/globals');
 

// declaring one test group, with common initialisation.
describe('Execute tests on Bing', () => {

    let driver;

    beforeAll(async () => {    
        driver = new Builder().forBrowser("chrome").build();
    }, 15000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    test('', async () => {
    await driver.get  ( "https://localhost:80" );
    });
})