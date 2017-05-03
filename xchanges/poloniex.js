'use strict';

// TODO: remove this from polling and use suggested autobahn

const returnTicker = 'https://poloniex.com/public?command=returnTicker'; // we need BTC_ETH, BTC_LTC, BTC_DASH

module.exports = {    
    sendRequest: function(request, reqTimeInUtc, ExchangeRecord){
        // console.warn('DateTime ', reqTimeInUtc);
        request(returnTicker, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body)
                const ETH = info['BTC_ETH'],
                      LTC = info['BTC_LTC'],
                      DASH = info['BTC_DASH'];

                let responseValues = [{
                    currency: 'BTC-ETH',
                    highBid: ETH.last,
                    lowAsk: ETH.lowestAsk
                },{
                    currency: 'BTC-DSH',
                    highBid: DASH.last,
                    lowAsk: DASH.lowestAsk
                },{
                    currency: 'BTC-LTC',
                    highBid: LTC.last,
                    lowAsk: LTC.lowestAsk
                }]
                let dataRecord = new ExchangeRecord({ exchange: 'polo', values: responseValues, timeRecorded: reqTimeInUtc })
                dataRecord.save(function (err) {
                    if (err) return handleError(err);
                })
            }
        })
    }
};