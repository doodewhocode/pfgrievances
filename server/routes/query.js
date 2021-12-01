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
    //obj['docs'] = []
    console.log("req.files['file2'][0]", req.files['file2'])

    var tempArr = JSON.parse(obj['docs'])
    console.log("tempArr", tempArr)

    for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i].docId === req.files['file1'][0].originalname) {
            tempArr[i]['fileId'] = req.files['file1'][0].id;
            tempArr[i]['fileName'] = req.files['file1'][0].filename;
            tempArr[i]['date'] = new Date()
        }
        if (req.files['file2'] !== undefined) {
            if (tempArr[i].docId === req.files['file2'][0].originalname) {
                tempArr[i]['fileId'] = req.files['file2'][0].id;
                tempArr[i]['fileName'] = req.files['file2'][0].filename;
                tempArr[i]['date'] = new Date()
            }
        }
    }
    obj['docs'] = tempArr
    obj['createDate'] = new Date()
    console.log("hehe", obj)

    Query.saveQuery(obj, function (err, query) {
        console.log(query)
        if (err) return next(err);
        res.json({ message: 'Query created' })
    });

})


router.post('/updatequeryctl', async function (req, res, next) {
    let obj = req.body
    obj['modifiedDate'] = new Date()
    console.log("update query", obj)
    Query.updateQuery(obj, function (err, query) {
        console.log(query)
        if (err) return next(err);
        res.json(query)
    })
})

router.get('/deletequeryctl', async function (req, res, next) {
    console.log("delete query", req.query.id)
    Query.deleteQuery(req.query.id, function (err, query) {
        console.log(query)
        if (err) return next(err);
        res.json(query)
    })
})

router.get('/fetchallquery', async function (req, res, next) {
    Query.getQueryList(function (err, query) {
        console.log(query)
        if (err) return next(err);
        res.json(query)
    })
})



module.exports = router;
