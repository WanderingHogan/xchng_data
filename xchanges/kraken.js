'use strict';

const apiLookups = [
    'https://api.kraken.com/0/public/Depth?pair=XLTCXXBT',
    'https://api.kraken.com/0/public/Depth?pair=XETHXXBT',
    'https://api.kraken.com/0/public/Depth?pair=XXDGXXBT'
]

// const ltc_btc_url = 'https://api.kraken.com/0/public/Depth?pair=LTCXBT',
//       eth_btc_url = 'https://api.kraken.com/0/public/Depth?pair=XETHXXBT',
//       doge_btc_url = 'https://api.kraken.com/0/public/Depth?pair=XXDGXXBT';
// i think we need 'buy'' value
// TODO: simplify all this and use the single endpoint: https://btc-e.com/api/3/ticker/btc_usd-btc_rur-eth_btc
// TODO: read the documentation better next time
module.exports = {
    sendRequest: function (request, reqTimeInUtc, ExchangeRecord) {
        async function main() {
            let responseValues = [];
            let count = 0;
            let apiUrls = apiLookups.map(async function (theUrl) {
                let pushbackObject = {};
                await request(theUrl, function (error, response, body) {
                    if (!error) {
                        let info = JSON.parse(body)
                        //TODO: fix JS math problem, check out bignumber on nodejs
                        if (info.result.XLTCXXBT) {
                            console.log(info.result.XLTCXXBT.ask)
                            // console.log(info.result.XLTCXXBT.ask.map(askArray => 'Total of ' + (Number(askArray[0]) * Number(askArray[1])) + ' available at ' + askArray[0]))
                            pushbackObject = {
                                currency: 'LTC-BTC'
                            }
                        }
                        // if (info.result.XETHXXBT) {
                        //     pushbackObject = {
                        //         currency: 'ETH-BTC',
                        //         highBid: info.dsh_btc.high,
                        //         lowAsk: info.dsh_btc.low,
                        //         buy: info.dsh_btc.buy
                        //     }
                        // }
                        // if (info.result.XXDGXXBT) {
                        //     pushbackObject = {
                        //         currency: 'DOGE-BTC',
                        //         highBid: info.ltc_btc.high,
                        //         lowAsk: info.ltc_btc.low,
                        //         buy: info.ltc_btc.buy
                        //     }
                        // }
                        // count = count + 1;
                    }
                    responseValues.push(pushbackObject)
                })
            })
            await Promise.all(apiUrls).then(() => {
                let dataRecord = new ExchangeRecord({ exchange: 'btc-e', values: responseValues, timeRecorded: reqTimeInUtc })
                dataRecord.save(function (err) {
                    if (err) return handleError(err);
                })
            })
        }
        main()
    }
};
