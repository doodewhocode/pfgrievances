const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const TypedError = require('../middleware/ErrorHandler')
const Image = require('../middleware/Image')
var multer = require('multer');
var fs = require('fs')
const crypto = require('crypto');
var FileReader = require('filereader')
const path = require("path");
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const conn = require('../models/init')
const mongodb = require('mongodb')

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
//upload.fields([{ name: 'panImg', maxCount: 1 }, {  name: 'aadharImg', maxCount: 1}, { name: 'json', maxCount: 1 }]), 
//POST /signin
router.post('/employee_register',
  async function (req, res, next) {
    //console.log("hehe", req.files);
    // var img = fs.readFileSync(req.file.path);
    // var encode_img = img.toString('base64');
    // var final_img = {
    //   contentType: req.file.mimetype,
    //   image: new Buffer(encode_img, 'base64')
    // };

    /*gfs = Grid(conn.mongoose.connection.db, { bucketName: 'uploads' });
    console.log(gfs)
    console.log("hehe", req.files['json'][0].id)
    var writeStream, readStream, buffer = "";
    await gfs.files.findOne({ _id: mongodb.ObjectId(req.files['json'][0].id) }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        console.log("not found")
        return res.status(404).json({ err: 'No file exists' });
      }
      console.log("file", file)
    })
    writeStream = gfs.createWriteStream({_id:req.files['json'][0].id});
    fs.createReadStream().pipe(writeStream);
    writeStream.on("close", function(){
      readStream = gfs.createReadStream({filename:req.files['json'][0].filename});
      readStream.on("data", function(chunk){
        buffer+=chunk;
      })
      readStream.on("end", function(){
        console.log("contents", buffer);
      })
    })*/

    let obj = req.body
    req.checkBody('firstName', 'fullname is required').notEmpty();
    req.checkBody('pfNo', 'pfNo is required').notEmpty();
    req.checkBody('emailId', 'Email is required').notEmpty();
    req.checkBody('phNo', 'Phone No is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmPassword', 'verifyPassword is required').notEmpty();
    let missingFieldErrors = req.validationErrors();
    if (missingFieldErrors) {
      let err = new TypedError('signin error', 400, 'missing_field', {
        errors: missingFieldErrors,
      })
      return next(err)
    }
    req.checkBody('emailId', 'Email is not valid').isEmail();
    req.checkBody('password', 'Passwords have to match').equals(req.body.confirmPassword);
    let invalidFieldErrors = req.validationErrors()
    if (invalidFieldErrors) {
      let err = new TypedError('signin error', 400, 'invalid_field', {
        errors: invalidFieldErrors,
      })
      return next(err)
    }
    console.log("check", obj)
    obj['encryptedStore'] = obj['password']
    delete obj['password']
    delete obj['confirmPassword']
    var newUser = new User(obj);
    //console.log(newUser)
    User.getUserByEmail(obj.emailId, function (error, user) {
      if (error) return next(err)
      if (user) {
        let err = new TypedError('signin error', 409, 'invalid_field', {
          message: "user is existed"
        })
        return next(err)
      }
      console.log("hehe", user)
      User.createUser(newUser, function (err, user) {
        console.log(user)
        if (err) return next(err);
        res.json({ message: 'user created' })
      });
    })

  });


router.post('/register',
  async function (req, res, next) {
    let obj = req.body
    req.checkBody('firstName', 'fullname is required').notEmpty();
    req.checkBody('emailId', 'Email is required').notEmpty();
    req.checkBody('phNo', 'Phone No is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmPassword', 'verifyPassword is required').notEmpty();
    let missingFieldErrors = req.validationErrors();
    if (missingFieldErrors) {
      let err = new TypedError('signin error', 400, 'missing_field', {
        errors: missingFieldErrors,
      })
      return next(err)
    }
    req.checkBody('emailId', 'Email is not valid').isEmail();
    req.checkBody('password', 'Passwords have to match').equals(req.body.confirmPassword);
    let invalidFieldErrors = req.validationErrors()
    if (invalidFieldErrors) {
      let err = new TypedError('signin error', 400, 'invalid_field', {
        errors: invalidFieldErrors,
      })
      return next(err)
    }
    console.log("check", obj)
    obj['encryptedStore'] = obj['password']
    delete obj['password']
    delete obj['confirmPassword']
    var newUser = new User(obj);
    //console.log(newUser)
    User.getUserByEmail(obj.emailId, function (error, user) {
      if (error) return next(err)
      if (user) {
        let err = new TypedError('signin error', 409, 'invalid_field', {
          message: "user is existed"
        })
        return next(err)
      }
      console.log("hehe", user)
      User.createUser(newUser, function (err, user) {
        console.log(user)
        if (err) return next(err);
        res.json({ message: 'user created' })
      });
    })
  })


router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //check if files
    if (!files || files.legth === 0) {
      return res.status(404).json({
        err: 'No files exists'
      })
    }
    return res.json(files);
  })
})


router.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if files
    if (!file || file.legth === 0) {
      return res.status(404).json({
        err: 'No file exists'
      })
    }
    return res.json(files);
  })
})

router.get('/delete/:filename', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, res) => {
    //check if file is deleted
    if (err) {
      return res.status(404).json({ err: err })
    }
    return res.status(200).json(res)
  })
})

//POST /login
router.post('/login', function (req, res, next) {
  const { email, password } = req.body.credential || {}
  if (!email || !password) {
    let err = new TypedError('login error', 400, 'missing_field', { message: "missing username or password" })
    return next(err)
  }
  User.getUserByEmail(email, function (err, user) {
    if (err) return next(err)
    if (!user) {
      let err = new TypedError('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
      return next(err)
    }
    console.log("heheh", user)
    User.comparePassword(password, user.encryptedStore, function (err, isMatch) {
      if (err) return next(err)
      if (isMatch) {
        let token = jwt.sign(
          { email: email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        )
        res.status(201).json({
          user_token: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailId,
            userType: user.userType,
            employerName: user.employerName,
            token: token,
            expire_in: '7d'
          }
        })
      } else {
        let err = new TypedError('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
        return next(err)
      }
    })
  })
})


router.post('/forgotpasswordResponse', function (req, res, next) {
  User.forgotpasswordResponse(req, function (err, c) {
    console.log("HI:" + req.body.email);
    if (err) return next(err)
    res.json({ status: 'success', message: 'An e-mail has been sent to ' + req.body.email + ' with further instructions.' });
  })
})

router.get('/reset/:token', function (req, res, next) {
  User.resetpasswordResponse(req, function (err, c) {
    if (err) return next(err);
    if (!c) {
      res.status(500).json({ message: 'Password reset token is invalid or has expired.' });
    } else {
      res.json({ message: 'token is valid' })
    }
  })
})

router.post('/reset/:token', function (req, res, next) {
  User.setpasswordResponsemail(req, function (err, c) {
    if (err) return next(err)
    res.json({ status: 'success', message: 'Success! Your password has been changed.' });
  })
})

router.get('/fetchuserbyid', function (req, res, next) {
  let id = req.query.id
  User.getUserById(id, function (err, user) {
    console.log(user)
    if (err) return next(err);
    res.json(user)
  });
})
module.exports = router;