// load 3rd party libs
const request = require('request-promise'),
      mongoose = require('mongoose');

// connect to mongo and load config
const env = require('./config/config.js'),
      environment = new env();

mongoose.connect(environment.connstring, {
  useMongoClient: true
 });

// load model/create collection if it does not exist
const ExchangeRecord = require('./models/exchangeHistory.js')(mongoose);
// const ExchangeRecord = 'hi'
const kraken = require('./xchanges/kraken.js'),
      polo = require('./xchanges/poloniex.js'),
      bttx = require('./xchanges/bittrex.js');

// load exchanges
setInterval(function() {
    let utcDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    kraken.sendRequest(request, utcDateTime, ExchangeRecord); // uses async/await because route for each currency
    // polo.sendRequest(request, utcDateTime, ExchangeRecord);
    // bttx.sendRequest(request, utcDateTime, ExchangeRecord);
}, (environment.pollFrequencyInSeconds * 1000));

console.log('running the database populator microservice...')
