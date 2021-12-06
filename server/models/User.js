const conn = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')

const userSchema = new conn.mongoose.Schema({
    userId: Number,
    emailId: { type: String, index: true },
    encryptedStore: String,
    dateRegistered: Date,
    lastLoggedIn: Date,
    activeUser: String,
    dateDeactivated: Date,
    lastModifiedDate: Date,
    userType: String,
    employerId: Number,
    alertPreference: String,
    defaultPayment: String,
    firstName: String,
    lastName: String,
    dob: Date,
    employerName: String,
    uanNo: String,
    pfNo: String,
    phNo: { type: String, index: true },
    panNo: String,
    panImg: Object,
    aadharNo: Number,
    aadharImg: Object,
    hrMobileNo: String,
    hrEmailId: String,
    setRegNo: String,
    pfRegNo: String,
    esicRegNo: String,
    pfOfficeAddr: String,
    esicOfficeAddr: String,
    employerAddr: String,
    employerCity: String,
    additionalDoc: {
        tenThMarksheet: Object,
        birthCert: Object,
        affidivet: Object
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: String },
    otp: { type: Number }
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'emailId',
    usernameLowerCase: true,
    session: false
})
const crypto = require('crypto');
const bcrypt = require('bcrypt');

var User = (module.exports = conn.mongoose.model('user_details', userSchema))



module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.encryptedStore, salt, function (err, hash) {
            newUser.encryptedStore = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function (email, callback) {
    var query = { emailId: email };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (givenPassword, hash, callback) {
    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function (callback) {
    User.find(callback)
}

module.exports.getUsersCount = function (callback) {
    User.countDocuments({}, callback)
}

module.exports.forgotpasswordResponse = function (req, callback) {
    console.log(req.body);
    crypto.randomBytes(20, function (err, buf) {
        if (err) throw err;
        var token = buf.toString('hex');
        console.log(token);
        var val = Math.floor(1000 + Math.random() * 9000);
        var query = { email: req.body.email };
        console.log('asdfadf', req.body.email)
        User.findOne(query, function (err, result) {
            if (err) throw err;
            console.log('forgotpasswordResponse', result)
            if (result.length == 0) {
                req.flash('error', 'No account with that email address exists.');
            }
            var myquery = { email: req.body.email };
            var newvalues = { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000, otp: val } };
            User.updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                var emailVal = myquery.email;
                console.log(emailVal);
                const mailOptions = {
                    to: emailVal,
                    from: '',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        process.env.FRONT_END_URL + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n' +
                        'User OTP for reset password via mobile app\n\n' +
                        'OTP' + val
                };
                Mail.sendMail(mailOptions, function (err, c) {
                    callback(err, c)
                })
            });
        });
    });
}

module.exports.resetpasswordResponse = function (req, callback) {
    console.log("welcome");
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, callback);
}




module.exports.setPasswordViaApp = function (req, callback) {
    User.findOne({ otp: req.body.otp, email: req.body.email, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            //throw { message: 'Password reset OTP is invalid or has expired.' };
        }
        var myquery = { otp: req.body.otp, email: req.body.email };
        var newvalues = { $set: { password: req.body.password, resetPasswordToken: undefined, resetPasswordExpires: undefined, otp: undefined, modifiedDate: Date(Date.now()) } };
        User.updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated", result);
            var mailOptions = {
                to: myquery.email,
                from: '',
                subject: 'ComplyHR :: Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + result.email + ' has just been changed.\n'
            };
            Mail.sendMail(mailOptions, callback)
        });
    });
}


module.exports.setpasswordResponsemail = function (req, callback) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            throw { message: 'Password reset token is invalid or has expired.' };
        }
        var myquery = { resetPasswordToken: req.params.token };
        var newvalues = { $set: { password: req.body.password, resetPasswordToken: undefined, resetPasswordExpires: undefined, modifiedDate: Date(Date.now()) } };
        User.updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
            var mailOptions = {
                to: result.email,
                from: '',
                subject: 'ComplyHR :: Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + result.email + ' has just been changed.\n'
            };
            Mail.sendMail(mailOptions, callback)
        });
    });
}


module.exports.updateUser = function (obj, callback) {
    let query = { _id: obj._id }
    var newvalues = { $set: obj }
    console.log(query, newvalues)
    User.findOneAndUpdate(query, newvalues, { new: true }, callback)
}

module.exports.viewFile = function (id, callback) {
    var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
    gfs = Grid(db, mongoDriver);
    gfs.collection('uploads');
    gfs.files.findOne({ _id: new mongoose.Types.ObjectId(id) }, async (err, file) => {
        if (!file || file.length === 0) {
            console.log("not found")
            callback(true, { err: 'No file exists' })
            //return res.status(404).json({ err: 'No file exists' });
        }
        if (err) {
            callback(true, { err: err })
            //return res.status(404).json({ err: err })
        }
        var readStream = await gfs.createReadStream({
            filename: file.filename
        });
        let finalFile = ""

        await readStream.on('data', function (data) {
            let bufData = data.toString('base64')
            let ab= toArrayBuffer(data)
            finalFile = 'data:' + file.contentType + ';base64,' + bufData;
            //console.log(ab);
            //finalFile = data;
        })
        readStream.on('end', function () {
            callback(false, finalFile)
        })
    })
}

function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i]
    }
    return ab;
}

