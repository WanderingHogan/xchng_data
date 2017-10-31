'use strict';

const returnTicker = 'https://api.kraken.com/0/public/Ticker?pair=XLTCXXBT,XETHXXBT,XXDGXXBT'; 
// v[1] is volume for last 24 hrs
// p[1] is volume weighted price for last 24 hrs
// l[1] is low for last 24 hrs
// h[1] is high for last 24 hrs
// c[0] is last trade price

module.exports = {
    sendRequest: function(request, reqTimeInUtc, ExchangeRecord){
        request(returnTicker, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body)
                let BTC_ETH = info.result['XETHXXBT'];
                let BTC_LTC = info.result['XLTCXXBT'];
                let BTC_DOGE = info.result['XXDGXXBT'];
                let responseValues = [{
                    currency: 'BTC-ETH',
                    high: BTC_ETH.h[1],
                    low: BTC_ETH.l[1],
                    last: BTC_ETH.c[0],
                    volume: BTC_ETH.v[1]
                },{
                    currency: 'BTC-DOGE',
                    high: BTC_DOGE.h[1],
                    low: BTC_DOGE.l[1],
                    last: BTC_DOGE.c[0],
                    volume: BTC_DOGE.v[1]
                },{
                    currency: 'BTC-LTC',
                    high: BTC_LTC.h[1],
                    low: BTC_LTC.l[1],
                    last: BTC_LTC.c[0],
                    volume: BTC_LTC.v[1]
                }]
                let dataRecord = new ExchangeRecord({ exchange: 'kraken', values: responseValues, timeRecorded: reqTimeInUtc })
                console.log(dataRecord)
                dataRecord.save(function (err) {
                    if (err) return handleError(err);
                })
            }
        })
    }
};
