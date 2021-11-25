const conn = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const querySchema = new conn.mongoose.Schema({
    queryId: String,
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


module.exports.saveQuery = function (newQuery, callback) {
    newQuery.save(callback)
}


module.exports.updateQuery = function (obj, callback) {
    let query = { _id: obj._id }
    //var newvalues = { $set: { status: "", c 
    Query.updateOne(query, obj, { upsert: true }, callback)
}