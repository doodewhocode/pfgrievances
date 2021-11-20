const conn = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const grievanceSchema = new conn.mongoose.Schema({
    grivId: String,
    grivType: String,
    userId: String,
    status: String,
    employerId: String,
    startDate: Date,
    modifiedDateBy: String,
    modifiedDate: Date,
    endDate: Date,
    previousStatus: String,
    note: String,
    comments: {
        type: Array
    },
    actions: String,
    assignedTo: String,
    pendingDays: Number,
    submitterId: Number,
    grivDoc1: Array,
    grivDoc2: Array,
    grivDoc3: Array,
    proofDocZip: Array,
    paymentStatus: String,
    paidAmount: String,
    paymentMethod: String
})


var PFGrievance = (module.exports = conn.mongoose.model('grievance_details', grievanceSchema))


module.exports.saveQuery = function (newGrievance, callback) {
    newGrievance.save(callback)
}


module.exports.updateQuery = function (req, callback) {
    let query = { _id: req.body._id }
    //var newvalues = { $set: { status: "", c 
    PFGrievance.updateOne(query, req.body, function (err, result) {
    })
}

module.exports.getAllPFGrievance = function (callback) {
    PFGrievance.find(callback)
}

module.exports.getGrivByUserId = function (id, callback) {
    var query = { 'userId': id }
    PFGrievance.find(query, callback);
}

module.exports.getGrivById = function (id, callback) {
    PFGrievance.findById(id, callback);
}

module.exports.getAllGrivByEmployer = function (employer, callback) {
    var query = { 'employerName': employer }
    PFGrievance.find(query, callback);
}