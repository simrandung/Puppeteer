
const puppeteer = require('puppeteer');

async function start() {

    const Url = "https://www.imdb.com/";
    const movieName = 'Zara Hatke Zara Bachke';
    const browser = await puppeteer.launch({ headless: false , args: ['--start-maximized'] , defaultViewport:null});
    const page = await browser.newPage();
    await page.goto(Url);

    // const selector = {
    //     searchBox : document.querySelector('div.sc-idXgbr.iHkrUj.searchform__inputContainer')
    // }
    //await page.screenshot({path:"example.png"});
    await page.waitForSelector("#suggestion-search",{ 'visible': true, 'timeout': 30000 })
    await page.type('#suggestion-search' , movieName);
    await page.waitForSelector('div.sc-bjfHbI.fOUGiO.searchResult__constTitle',{ 'visible': true, 'timeout': 30000 })
    await page.click('div.sc-bjfHbI.fOUGiO.searchResult__constTitle')
    await page.waitForSelector("div.sc-52d569c6-0.kNzJA-D>h1",{ 'visible': true, 'timeout': 30000 })

    let title = await page.$(
        "div.sc-52d569c6-0.kNzJA-D>h1");
    let value = await page.evaluate((el) => el.textContent, title);
    console.log(value);
    await page.waitForSelector("span.sc-bde20123-1.iZlgcd",{'visible' : true, 'timeout' : 30000 });
    let rating = await page.$(
        "span.sc-bde20123-1.iZlgcd");
    let ratingValue = await page.evaluate((el) => el.textContent, rating);
    console.log(ratingValue);   
   

    await browser.close();
}
start();