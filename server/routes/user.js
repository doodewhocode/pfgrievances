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
const mongoose = require('mongoose')
const Mail = require('../middleware/Mail')

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

router.post('/employee_register',
  async function (req, res, next) {
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

router.get('/file/:id', async (req, res) => {
  var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
  gfs = Grid(db, mongoDriver);
  gfs.collection('uploads');
  gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, async (err, file) => {
    if (!file || file.length === 0) {
      console.log("not found")
      return res.status(404).json({ err: 'No file exists' });
    }
    if (err) {
      return res.status(404).json({ err: err })
    }
    var readStream = await gfs.createReadStream({
      filename: file.filename
    });
    let finalFile = ""
    await readStream.on('data', function (data) {
      let bufData = data.toString('base64')
      //console.log("bufData", bufData);
      finalFile = 'data:' + file.contentType + ';base64,' + bufData;
      res.status(200).json(finalFile);
    })
  })
})

router.get('/download/:id', async (req, res) => {
  var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
  gfs = Grid(db, mongoDriver);
  gfs.collection('uploads');
  gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, async (err, file) => {
    if (!file || file.length === 0) {
      console.log("not found")
      return res.status(404).json({ err: 'No file exists' });
    }
    if (err) {
      return res.status(404).json({ err: err })
    }
    var readstream = await gfs.createReadStream({
      filename: file.filename
    });
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    readstream.on("error", function (err) {
      res.end();
    });
    readstream.pipe(res);
  })
})



router.get('/view/:id', async (req, res) => {
  User.viewFile(req.params.id, function (err, data) {
    if (err) {
      return res.status(404).json({ err: data })
    }
    return res.status(200).json(data)
  })
})


function getFile(readStream, callback) {
  readStream.on('data', function (data) {
    let bufData = data.toString('base64')
    //let finalFile = 'data:' + file.contentType + ';base64,' + bufData;
    callback(bufData)
  })
}



router.get('/file/:filename', (req, res) => {
  var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
  console.log(db)
  const gfs = Grid(db, mongoDriver, { bucketName: 'uploads' });

  console.log("gfs", gfs)
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if files
    console.log(file)
    if (!file || file.legth === 0) {
      return res.status(404).json({
        err: 'No file exists'
      })
    }
    return res.json(file);
  })
})

router.get('/delete/:id', (req, res) => {
  var db = conn.mongoose.connection.db, mongoDriver = conn.mongoose.mongo;
  console.log(db)
  const gfs = Grid(db, mongoDriver, { bucketName: 'uploads' });
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
            phNo: user.phNo,
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
router.get('/fetchallusers', function (req, res, next) {
  User.getAllUsers(function (err, user) {
    console.log(user)
    if (err) return next(err);
    res.json(user)
  });
})

router.post('/uploaduserdoc', upload.fields([{ name: 'panImg', maxCount: 1 },
{ name: 'aadharImg', maxCount: 1 }, { name: 'tenThMarksheet', maxCount: 1 },
{ name: 'birthCert', maxCount: 1 }, { name: 'affidivet', maxCount: 1 }]), function (req, res, next) {
  let obj = req.body
  console.log(req.files)
  if (req.files['panImg'] !== undefined) {
    obj['panImg'] = {
      originalname: req.files['panImg'][0].originalname,
      id: req.files['panImg'][0].id,
      fileName: req.files['panImg'][0].filename,
      date: new Date()
    }
  }
  if (req.files['aadharImg'] !== undefined) {
    obj['aadharImg'] = {
      originalname: req.files['aadharImg'][0].originalname,
      id: req.files['aadharImg'][0].id,
      fileName: req.files['aadharImg'][0].filename,
      date: new Date()
    }
  }
  if (req.files['tenThMarksheet'] !== undefined) {
    obj.additionalDoc['tenThMarksheet'] = {
      originalname: req.files['panImg'][0].originalname,
      id: req.files['panImg'][0].id,
      fileName: req.files['panImg'][0].filename,
      date: new Date()
    }
  }
  if (req.files['birthCert'] !== undefined) {
    obj.additionalDoc['birthCert'] = {
      originalname: req.files['birthCert'][0].originalname,
      id: req.files['birthCert'][0].id,
      fileName: req.files['birthCert'][0].filename,
      date: new Date()
    }
  }
  if (req.files['affidivet'] !== undefined) {
    obj.additionalDoc['affidivet'] = {
      originalname: req.files['affidivet'][0].originalname,
      id: req.files['affidivet'][0].id,
      fileName: req.files['affidivet'][0].filename,
      date: new Date()
    }
  }
  obj['lastModifiedDate'] = new Date()
  User.updateUser(obj, function (err, user) {
    console.log(user)
    if (err) return next(err);
    res.json(user)
  })

})

router.post('/updateuser', function (req, res, next) {
  let obj = req.body
  console.log("update query", obj)
  obj['lastModifiedDate'] = new Date()
  User.updateUser(obj, function (err, user) {
    console.log(user)
    if (err) return next(err);
    res.json(user)
  })
})
router.get('/checkmail', function (req, res, next) {
  var mailOptions = {
    to: 'vvkslv3@gmail.com',
    from: '',
    subject: 'ComplyHR :: test mail server',
    text: 'Hello,\n\n' +
      'This is a test mail to check the server config'
  };
  Mail.cPanelMail(mailOptions, function (err, c) {
    if (err) return next(err)
    res.json({ status: 'success', message: 'Success!' });
  })
})

module.exports = router;