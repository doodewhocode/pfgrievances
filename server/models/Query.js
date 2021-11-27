const conn = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

let counter = 1;
let counterId = { type: Number, default: () => counter++ };

const querySchema = new conn.mongoose.Schema({
    queryId: counterId,
    queryName: String,
    queryDesc: String,
    additionalDesc: String,
    price: Number,
    docs: Array,
    createDate: Date,
    modifiedBy: String,
    modifiedDate: Date
})


var Query = (module.exports = conn.mongoose.model('query_details', querySchema))


module.exports.saveQuery = function (obj, callback) {
    Query.find({ queryId: { $gt: 0 } }).sort({ queryId: -1 }).then(([first, ...others]) => {
        if (first)
            counter = first.queryId + 1
    })
    var newQuery = new Query(obj);
    newQuery.save(callback)
}

module.exports.getQueryList = function (callback) {
    Query.find(callback)
}


module.exports.updateQuery = function (obj, callback) {
    let query = { _id: obj._id }
    //var newvalues = { $set: { status: "", c 
    Query.updateOne(query, obj, { upsert: true }, callback)
}

module.exports.deleteQuery = function (id, callback) {
    let query = { _id: id }
    //var newvalues = { $set: { status: "", c 
    Query.deleteOne(query, callback)
}