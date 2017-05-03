'use strict';

// TODO: remove this from polling and use suggested autobahn

const returnTicker = 'https://bittrex.com/api/v1.1/public/getmarketsummaries'; // we need BTC_ETH, BTC_LTC, BTC_DASH

module.exports = {    
    sendRequest: function(request, reqTimeInUtc, ExchangeRecord){
        request(returnTicker, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body)
                let BTC_ETH, BTC_LTC, BTC_DASH;
                for (const index in info.result) {

                    if(info.result[index].MarketName === 'BTC-ETH'){
                        BTC_ETH = info.result[index];
                    }
                    if(info.result[index].MarketName === 'BTC-LTC'){
                        BTC_LTC = info.result[index];
                    }
                    if(info.result[index].MarketName === 'BTC-DASH'){
                        BTC_DASH = info.result[index];
                    }
                }

                let responseValues = [{
                    currency: 'BTC-ETH',
                    highBid: BTC_ETH.High,
                    lowAsk: BTC_ETH.Low
                },{
                    currency: 'BTC-DSH',
                    highBid: BTC_DASH.High,
                    lowAsk: BTC_DASH.Low
                },{
                    currency: 'BTC-LTC',
                    highBid: BTC_LTC.High,
                    lowAsk: BTC_LTC.Low
                }]
                let dataRecord = new ExchangeRecord({ exchange: 'polo', values: responseValues, timeRecorded: reqTimeInUtc })
                dataRecord.save(function (err) {
                    if (err) return handleError(err);
                })
            }
        })
    }
};