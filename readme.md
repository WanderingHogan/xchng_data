This populates a mongodatabase with different bit/altcoin high, low, and 24 hr volume values every 10 seconds. You will want to copy the /config/config.example.js file and replace the connstring to be that for your mongo database.

To run, clone this down, run `npm install`, and `npm run`.

This probably will NOT work on node versions less than 7.9 because it uses async/await.

This is NOT a webservice.

Currently configured for Bittrex (even though they are in a 2 bedroom redmond wa APT according to twitter, kraken, and polo)