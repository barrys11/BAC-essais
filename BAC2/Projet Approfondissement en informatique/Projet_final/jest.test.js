const {Builder,By,Key,Util} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const script = require('jest');
const { beforeAll } = require('@jest/globals');

describe("",()=>{
    let driver;

    beforeAll(async () => {  
        var options = new chrome.Options();
        options.addArguments('--allow-insecure-localhost');  
        driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    },100000);
 
    afterAll(async () => {
      await driver.quit();
    }, 150000
    
    );
    
    test('index', async () => {
        await driver.get("https://localhost:10");
    });
    
    test('recherche index',async()=>{
        await driver.get("https://localhost:10");
        await driver.findElement(By.name("search")).sendKeys("arct",Key.RETURN);
    });
    test("page d'identification",async()=>{
        await driver.get("https://localhost:10");
        await driver.findElement(By.id("connect")).click();
        await driver.findElement(By.name("utilisateur")).sendKeys("utilisateur");
        await driver.findElement(By.name("mot_de_passe")).sendKeys("user1");
        await driver.findElement(By.id("soumis")).click();
        await driver.findElement(By.name("search")).sendKeys('Inte',Key.RETURN);
    })
    test("Nouveau compte",async()=>{
        await driver.get("https://localhost:10");
        await driver.findElement(By.id("connect")).click();
        await driver.findElement(By.name("Nouveau_Compte")).click();
        await driver.findElement(By.name("nom")).sendKeys("Ebona");
        await driver.findElement(By.name("prenom")).sendKeys("Patrick");
        await driver.findElement(By.name("mail")).sendKeys("pebona12@gmail.com");
        await driver.findElement(By.name("utilisateur")).sendKeys("patri");
        await driver.findElement(By.name("mot_de_passe")).sendKeys("user1",Key.RETURN);

    });
    test("Vendre un livre",async()=>{
        await driver.get("https://localhost:10");
        await driver.findElement(By.id("connect")).click();
        await driver.findElement(By.name("utilisateur")).sendKeys("barry");
        await driver.findElement(By.name("mot_de_passe")).sendKeys("user",Key.RETURN);
        await driver.findElement(By.name("vendre_bout")).sendKeys(Key.RETURN);
        await driver.findElement(By.name("titre")).sendKeys("java");
        await driver.findElement(By.name("auteur")).sendKeys("Barry Sounounou");
        await driver.findElement(By.name("edition")).sendKeys("8 th edition");
        await driver.findElement(By.name("prix")).sendKeys("35 €",Key.RETURN);
    })
    test("profile",async()=>{
        await driver.get("https://localhost:10");
        await driver.findElement(By.id("connect")).click();
        await driver.findElement(By.name("utilisateur")).sendKeys("barry");
        await driver.findElement(By.name("mot_de_passe")).sendKeys("user",Key.RETURN);
        await driver.findElement(By.name("dropdown")).sendKeys(Key.RETURN);
        await driver.findElement(By.name("profile_bout")).sendKeys(Key.RETURN);
    });
});
