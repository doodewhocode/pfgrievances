const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  userId: Number,
  emailId:{ type: String, index: true },
  encryptedStore:String,
  dateRegistered:Date,
  lastLoggedIn:Date,
  activeUser:String,
  dateDeactivated:Date,
  userType:String,
  employerId:Number,
  alertPreference:String,
  defaultPayment:String,
  firstName:String,
  lastName:String,
  dob:Date,
  employerName:String,
  uanNo:String,
  pfNo:String,
  phNo:{ type: String, index: true },
  panNo:String,
  panImg:{
    data: Buffer,
    contentType: String
},
aadharNo:Number,
aadharImg:{
  data: Buffer,
  contentType: String
},
hrMobileNo: Number,
hrEmailId: String,
setRegNo:String,
esicRegNo:String,
pfOfficeAddr:String,
esicOfficeAddr:String,
employerAddr:String,
employerCity:String,
resetPasswordToken: { type: String },
resetPasswordExpires: { type: String },
otp: {type: Number}
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'emailId',
  usernameLowerCase: true,
  session: false
})

const User = (module.exports = mongoose.model('User', userSchema))