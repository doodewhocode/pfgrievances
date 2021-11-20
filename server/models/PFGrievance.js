const conn = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const grievanceSchema = new conn.mongoose.Schema({
    grivId: String,
    grivType: String,
    userId: Number,
    status: String,
    employerId: Number,
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
    grivDoc1: Object,
    grivDoc2: Object,
    grivDoc3: Object,
    proofDocZip: Object,
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

module.exports.getPFGrievanceById = function (id, callback) {
    PFGrievance.findById(id, callback);
}