'use strict';

// TODO: remove this from polling and use suggested autobahn

const returnTicker = 'https://poloniex.com/public?command=returnTicker'; // we need BTC_ETH, BTC_LTC, BTC_DOGE
// baseVolume is volume in first currency pair
// quoteVolume is volume in the 2nd currency pair
// both appear to be 24 hour volumes based on coinmarketcap comparisons

module.exports = {
    sendRequest: function(request, reqTimeInUtc, ExchangeRecord){
        // console.warn('DateTime ', reqTimeInUtc);
        request(returnTicker, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body)
                const ETH = info['BTC_ETH'],
                      LTC = info['BTC_LTC'],
                      DOGE = info['BTC_DOGE'];

                let responseValues = [{
                    currency: 'BTC-ETH',
                    high: ETH.high24hr,
                    low: ETH.low24hr,
                    last: ETH.last,
                    volume: ETH.baseVolume // IN BTC
                },{
                    currency: 'BTC-DOGE',
                    high: DOGE.high24hr,
                    low: DOGE.low24hr,
                    last: DOGE.last, 
                    volume: DOGE.baseVolume
                },{
                    currency: 'BTC-LTC',
                    high: LTC.high24hr,
                    low: LTC.low24hr,
                    last: LTC.last, 
                    volume: LTC.baseVolume
                }]
                let dataRecord = new ExchangeRecord({ exchange: 'polo', values: responseValues, timeRecorded: reqTimeInUtc })
                dataRecord.save(function (err) {
                    if (err) return handleError(err);
                })
            }
        })
    }
};
