const {Builder,By,Key,Util} = require('selenium-webdriver');
const script = require('jest');
const { beforeAll } = require('@jest/globals');
 
const url = 'http://www.bing.com';
  
// declaring one test group, with common initialisation.
describe('Execute tests on Bing', () => {

  let driver;

  beforeAll(async () => {    
    driver = new Builder().forBrowser("chrome").build();
  }, 10000);
 
  afterAll(async () => {
    await driver.quit();
  }, 15000);
  
  test('Check whether the homepage we get back has Bing in its title', async () => {
    await driver.get  ( "http://www.bing.com" );
    let title = await driver.getTitle ();
    expect(title).toContain('Bing')
  });

  test('Check that a search for Selenium yields a result with Selenium', async () => {
    await driver.get  ( "http://www.bing.com" );
    await driver.findElement ( By.name ("q")). sendKeys ( "Selenium", Key.RETURN );
    let title = await driver.getTitle ();
    expect(title).toContain('Selenium')
  });
});
