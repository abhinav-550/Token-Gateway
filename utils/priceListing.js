import axios from "axios";

const apiKey = '08122578602f5e09ea475027bcb695909a49132399780919ec32bf5e077d1c2e';
const coinSymbols = 'BTC,ETH,BNB,XRP,USDT,ADA,SOL,DOGE,DOT,MATIC,AVAX,LTC,SHIB,TRX,UNI,ATOM,LINK,BCH,XLM,ALGO,ICP,FIL,VET,THETA,EOS,AAVE,XTZ,FTT,MKR,CRO,NEO,HNT,QNT,HBAR,SUSHI,GRT,KSM,CAKE,STX,ENJ,CHZ,ZIL,CELO,DASH,YFI,COMP,ZRX,1INCH,RUNE,BAT,OMG,NANO';
const currencySymbol = 'INR';

const apiUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinSymbols}&tsyms=${currencySymbol}&apikey=${apiKey}`;

async function run() {
    let priceListing = [];
    try {
        const response = await axios.get(apiUrl);
        
        for (const coin in response.data.RAW) {
            const coinData = response.data.RAW[coin][currencySymbol];
            if (coinData) {
                const name = coinData.FROMSYMBOL;
                const price = coinData.PRICE ? coinData.PRICE.toFixed(3) : 'N/A';
                const logoImage = coinData.IMAGEURL || '';
                const mktcap = coinData.MKTCAP || 'N/A';
                const openDayPrice = coinData.OPENDAY || 0;
                const changeDay = coinData.CHANGEDAY || 0;
                const per24 = openDayPrice !== 0 ? (changeDay / openDayPrice * 100).toFixed(2) : 'N/A';

                priceListing.push({ name, price, logoImage, mktcap, openDayPrice, per24 });
            }
        }
    } catch (error) {
        console.error('Error fetching coin price:', error);
        return []; // Return an empty array if there's an error
    }
    
    return priceListing;
}

export default run;
