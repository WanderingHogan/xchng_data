module.exports = function(mongoose) {
    const Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    const record = new Schema({
        uid         : ObjectId,
        exchange    : String,
        values      : [{
            currency    : String,
            highBid     : Number,
            lowAsk      : Number,
            buy         : Number
        }],
        timeRecorded: Date
    });

    return mongoose.model('ExchangeRecord', record);
    // return ExchangeRecord;
}
