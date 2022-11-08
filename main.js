const pt = require('puppeteer');
const dotenv = require('dotenv');
// import log from './utils.js';

dotenv.config();

pt.launch({headless:true}).then(async browser => {
    const URL_LOGIN = 'https://cargotycoon.pl/sign-in';
    const URL_WORLD = 'https://cargotycoon.pl/login-game-account/334063';
    const URL_ORDERS = 'https://s8.cargotycoon.pl/index.php?action=order';
    const URL_AUCTIONS = 'https://s8.cargotycoon.pl/index.php?action=auctions_orders';

    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
    });
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(URL_LOGIN);
    console.log('Opened login page');

    await page.$eval(
        'input[name="email"]',
        (el, value) => {
            el.value = value;
        },
        process.env.EMAIL
    );
    await page.$eval(
        'input[name="password"]',
        (el, value) => {
            el.value = value;
        },
        process.env.PASS
    );

    // await page.keyboard.down('Control');
    // page.keyboard.press('A');
    // await page.keyboard.type(String.fromCharCode(13));
    await page.click('input[type="submit"]');
    console.log('Waiting to log in...');


    await page.goto(URL_WORLD);
    console.log('Main page opened successfully')
    await page.goto(URL_AUCTIONS);
    console.log('Auctions page opened successfully')

    await page.waitForSelector('div[id^="przetarg"]', { timeout: 5000 });
    await page.select('#przetargi_typ_samochodu', '1'); // changing Auctions type to Container
    await page.waitForSelector('div[id^="przetarg"]', { timeout: 5000 });

    //const table_data = await page.$$eval('table tr td', tds => tds.map((td) => {
    //    return td.innerText;
    //}));
    // $eval = documenQuerySelector('')
    // $$eval = documenQuerySelectorAll('')


    //const getText = await page.$$eval('div[id^="przetarg_"]', el => el.innerText);

    const getText = await page.evaluate(() => 
        {[...document.querySelectorAll('div[id^="przetarg_"]')]
            .map( ({ innerText }) => innerText )}
    )

    console.log('Text is: ', getText);

    //console.log(await page.evaluate(document.querySelector("#przetargi div table tbody tr:nth-child(1) td:nth-child(5)").innerText));

    //console.log(table_data);

    console.log('Make a screenshot');

    //await page.screenshot({ path: 'example.png' });

    await browser.close();
});