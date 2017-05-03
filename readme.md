This populates a mongodatabase with different bit/altcoin high and low values every 10 seconds. You will want to copy the /config/database.example.js file and replace the connstring to be that for your mongo database.

To run, clone this down, run `npm install`, and `npm run`.

This probably will NOT work on node versions less than 7.9 because it uses async/await.

This is NOT a webservice.

