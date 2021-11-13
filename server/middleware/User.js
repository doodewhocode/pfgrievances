const User = require('../models/User')
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const createUser = (newUser, callback) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

const getUserByEmail = (email, callback) => {
    var query = { email: email };
    User.findOne(query, callback);
}

const getUserById = (id, callback) => {
    User.findById(id, callback);
}

const comparePassword = (givenPassword, hash, callback) => {
    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

const getAllUsers = (callback) => {
    User.find(callback)
  }
  
  const getUsersCount = (callback) => {
    User.countDocuments({}, callback)
  }
  
  const forgotpasswordResponse = (req, callback) => {
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
            console.log('forgotpasswordResponse',result)
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
  
  const resetpasswordResponse = (req, callback) => {
    console.log("welcome");
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, callback);
  }
  
  
  
  
  const setPasswordViaApp = (req, callback) => {
    User.findOne({ otp: req.body.otp, email: req.body.email, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            //throw { message: 'Password reset OTP is invalid or has expired.' };
        }
        var myquery = { otp: req.body.otp, email: req.body.email };
        var newvalues = { $set: { password: req.body.password, resetPasswordToken: undefined, resetPasswordExpires: undefined, otp:undefined, modifiedDate: Date(Date.now()) } };
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
  
  
  const setpasswordResponsemail = (req, callback) => {
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

  module.exports = {
    getAllUsers,
    getUsersCount,
    forgotpasswordResponse,
    resetpasswordResponse,
    setPasswordViaApp,
    setpasswordResponsemail,
    createUser,
    comparePassword
  }