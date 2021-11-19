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
    grivDoc1: Number,
    grivDoc2: Number,
    grivDoc3: Number,
    proofDocZip: Number,
    paymentStatus: String,
    paidAmount: String,
    paymentMethod: String
})

var PFGrievance = (module.exports = conn.mongoose.model('grievance_details', userSchema))