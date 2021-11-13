const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../middleware/User');
const TypedError = require('../middleware/ErrorHandler')
const Image = require('../middleware/Image')
var multer = require('multer');
var fs = require('fs')
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: "public/data/",
  filename: function(req, file, cb){
    crypto.randomBytes(20, (err, buf) => {
      cb(null, buf.toString("hex") + path.extname(file.originalname))
    })
  }
});
var upload = multer({ storage: storage });

//POST /signin
router.post('/employee_register', upload.fields([{ name: 'panImg', maxCount: 1 }, {
  name: 'aadharImg', maxCount: 1
}]), function (req, res, next) {
  console.log("hehe", req.file);
  // var img = fs.readFileSync(req.file.path);
  // var encode_img = img.toString('base64');
  // var final_img = {
  //   contentType: req.file.mimetype,
  //   image: new Buffer(encode_img, 'base64')
  // };
  let obj = req.body
  //const { fullname, email, password, verifyPassword } = req.body
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
  obj['encryptedStore'] = obj['password']
  delete obj['password']
  delete obj['confirmPassword']
  var newUser = new User(obj);
  User.getUserByEmail(email, function (error, user) {
    if (error) return next(err)
    if (user) {
      let err = new TypedError('signin error', 409, 'invalid_field', {
        message: "user is existed"
      })
      return next(err)
    }
    User.createUser(newUser, function (err, user) {
      if (err) return next(err);
      res.json({ message: 'user created' })
    });
  })

});

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
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) return next(err)
      if (isMatch) {
        let token = jwt.sign(
          { email: email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        )
        res.status(201).json({
          user_token: {
            user_id: user.id,
            user_name: user.fullname,
            email: user.email,
            admin: (('admin' in user) ? user.admin : false),
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


module.exports = router;