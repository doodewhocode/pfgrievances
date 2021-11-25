const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const Query = require('../models/Query')
const TypedError = require('../middleware/ErrorHandler')
var multer = require('multer');
var fs = require('fs')
const crypto = require('crypto');
var FileReader = require('filereader')
const path = require("path");
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const conn = require('../models/init')
const mongodb = require('mongodb')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

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


router.post('/createquery', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), async function (req, res, next) {
    let obj = req.body
    console.log(obj)
    req.checkBody('queryName', 'queryName is required').notEmpty();
    req.checkBody('queryDesc', 'queryDesc is required').notEmpty();
    req.checkBody('price', 'price is required').notEmpty();
    let missingFieldErrors = req.validationErrors();
    if (missingFieldErrors) {
        let err = new TypedError('error', 400, 'missing_field', {
            errors: missingFieldErrors,
        })
        return next(err)
    }
    console.log("req.files['file1']", req.files['file1'])
    obj['docs'] = []
    obj.docs.push({
        formId: req.files['file1'][0].originalname,
        id: req.files['file1'][0].id,
        fileName: req.files['file1'][0].filename,
        date: new Date()
    })
    obj.docs.push({
        formId: req.files['file2'][0].originalname,
        id: req.files['file2'][0].id,
        fileName: req.files['file2'][0].filename,
        date: new Date()
    })
    obj['createDate'] = new Date()
    var newQuery = new Query(obj);
    Query.saveQuery(newQuery, function (err, query) {
        console.log(query)
        if (err) return next(err);
        res.json({ message: 'Query created' })
    });

})

module.exports = router;
