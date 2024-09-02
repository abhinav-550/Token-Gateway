import run from './priceListing.js';

async function displayPrices() {
    const prices = await run();
    console.log(prices);
}

displayPrices();