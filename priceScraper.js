//Importing the library puppeteer. Puppeteer allows user to control chrome to extract information.
const puppeteer = require('puppeteer');

//Async function that allows us to wait for the previous operation to complete before moving on.
async function scrapeAmazon(url,userPrice){
    const browser = await puppeteer.launch();
    const webpage = await browser.newPage();
    await webpage.goto(url);

    //Scraping an element off of a website only requires 3 operations.
    //$x is a puppeteer operation that allows us to select an item off a page using its xpath.
    const [element] = await webpage.$x('//*[@id="price_inside_buybox"]');

    //Get source of the element ectracted using $x.
    const txt = await element.getProperty('textContent');

    //Get JSON value of the extracted txt
    const rawText = await txt.jsonValue();

    //Replaces CDN and dollar sign with nothing so it is easier to compare integers.
    const priceNumber = parseFloat(rawText.replace('CDN$', ''));
    console.log(priceNumber);
    if(priceNumber <= userPrice){
        console.log("send email");
    }
    browser.close();
}

scrapeAmazon("https://www.amazon.ca/HyperX-Tenkeyless-Mechanical-HX-KB4RD1-US-R1/dp/B074F5L8GQ/",70);