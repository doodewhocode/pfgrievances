const conn = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')


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
    var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
    const gfs = Grid(db, mongoDriver, { bucketName: 'uploads' });
    let query = { _id: id }
    Query.findOne(query, function (err, res) {
        if (err) callback(true, err)
        console.log(res)
        if (res.docs.length > 0) {
            if (res.docs.id !== undefined) {
                for (var i = 0; i < res.docs.length; i++) {
                    gfs.remove({ _id: new mongoose.Types.ObjectId(res.docs[i]), root: 'uploads' }, (err, res) => {
                        //check if file is deleted
                        if (err) {
                            callback(true, err)
                        }
                        console.log(res)
                    })
                }
            }
        }
        Query.deleteOne(query, callback)
    })
}

module.exports.deleteQueryDoc = function (req, callback) {
    var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
    const gfs = Grid(db, mongoDriver, { bucketName: 'uploads' });
    let query = { _id: req.query.typeid }
    Query.find(query, function (err, res) {
        if (err) callback(true, err)
        console.log(res)
        if (res.docs.length > 0) {
            if (res.docs.id !== undefined) {
                var tempArr = res.docs.map((obj, key) => {
                    if (obj.id !== req.query.fileid) {
                        return obj
                    }
                })
                gfs.remove({ _id: new mongoose.Types.ObjectId(req.query.fileid), root: 'uploads' }, (err, res) => {
                    //check if file is deleted
                    if (err) {
                        callback(true, err)
                    }
                    console.log(res)
                    var newvalues = { $set: { docs: tempArr } }
                    Query.updateOne(query, newvalues, callback)
                })
            }
        }
    })
}