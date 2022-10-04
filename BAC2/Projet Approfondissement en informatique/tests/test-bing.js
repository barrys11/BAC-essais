const { Builder, By, Key, util } = require ( "selenium-webdriver" );
async function example () {
  const driver = new Builder ().forBrowser ( "chrome" ).build ();
  await driver.get  ( "http://www.bing.com" );
  await driver.findElement ( By.name ("q")). sendKeys ( "Selenium", Key.RETURN );
  let title = await driver.getTitle ();
  console.log ( title );
}

example ();
