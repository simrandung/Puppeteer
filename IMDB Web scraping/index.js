const puppeteer = require('puppeteer');

async function start() {

    const movieUrl = "https://www.imdb.com/title/tt15576460/?ref_=nv_sr_srsg_0_tt_1_nm_7_q_zara"
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(movieUrl);
    //await page.screenshot({path:"example.png"});
    await page.waitForSelector("div.sc-52d569c6-0.kNzJA-D > h1",{ 'visible': true, 'timeout': 30000 })

    let title = await page.$(
        "div.sc-52d569c6-0.kNzJA-D > h1");
    let value = await page.evaluate((el) => el.textContent, title);
    console.log(value);

    let rating = await page.$(
        "span.sc-bde20123-1.iZlgcd");
    let ratingValue = await page.evaluate((el) => el.textContent, rating);
    console.log(ratingValue);


    await browser.close();
}

start();