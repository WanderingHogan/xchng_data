module.exports = function(mongoose) {
    const Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    const record = new Schema({
        uid         : ObjectId,
        exchange    : String,
        values      : [{
            currency : String,
            high     : Number,
            low      : Number,
            volume   : Number
        }],
        timeRecorded: Date
    });

    return mongoose.model('ExchangeRecord', record);
    // return ExchangeRecord;
}
