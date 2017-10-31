'use strict';

// TODO: remove this from polling and use suggested autobahn

const returnTicker = 'https://bittrex.com/api/v1.1/public/getmarketsummaries'; // This gives the high, low, and volume in the last 24 hrs

module.exports = {
    sendRequest: function(request, reqTimeInUtc, ExchangeRecord){
        request(returnTicker, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body)
                let BTC_ETH, BTC_LTC, BTC_DOGE;
                for (const index in info.result) {

                    if(info.result[index].MarketName === 'BTC-ETH'){
                        BTC_ETH = info.result[index];
                    }
                    if(info.result[index].MarketName === 'BTC-LTC'){
                        BTC_LTC = info.result[index];
                    }
                    if(info.result[index].MarketName === 'BTC-DOGE'){
                        BTC_DOGE = info.result[index];
                    }
                }

                let responseValues = [{
                    currency: 'BTC-ETH',
                    high: BTC_ETH.High,
                    low: BTC_ETH.Low,
                    volume: BTC_ETH.Volume
                },{
                    currency: 'BTC-DOGE',
                    high: BTC_DOGE.High,
                    low: BTC_DOGE.Low,
                    volume: BTC_DOGE.Volume
                },{
                    currency: 'BTC-LTC',
                    high: BTC_LTC.High,
                    low: BTC_LTC.Low,
                    volume: BTC_LTC.Volume
                }]
                let dataRecord = new ExchangeRecord({ exchange: 'bittrex', values: responseValues, timeRecorded: reqTimeInUtc })
                // console.log(dataRecord)
                dataRecord.save(function (err) {
                    console.log(err)
                    if (err) return handleError(err);
                })
            }
        })
    }
};
