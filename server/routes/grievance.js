const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const PFGrievance = require('../models/PFGrievance')
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

router.post('/query', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), async function (req, res, next) {
    let obj = req.body
    console.log(obj)
    req.checkBody('grivId', 'grivId is required').notEmpty();
    req.checkBody('grivType', 'grivType is required').notEmpty();
    req.checkBody('userId', 'userId is required').notEmpty();
    let missingFieldErrors = req.validationErrors();
    if (missingFieldErrors) {
        let err = new TypedError('error', 400, 'missing_field', {
            errors: missingFieldErrors,
        })
        return next(err)
    }
    console.log("req.files['file1']", req.files['file1'])
    obj['grivDoc1'] = [{
        formId: req.files['file1'][0].originalname,
        id: req.files['file1'][0].id,
        fileName: req.files['file1'][0].filename,
        date: new Date()
    }]

    obj['grivDoc2'] = [{
        formId: req.files['file2'][0].originalname,
        id: req.files['file2'][0].id,
        fileName: req.files['file2'][0].filename,
        date: new Date()
    }]
    obj['startDate'] = new Date()
    var newGrievance = new PFGrievance(obj);
    PFGrievance.saveQuery(newGrievance, function (err, grievance) {
        console.log(grievance)
        if (err) return next(err);
        res.json({ message: 'Query created' })
    });

})

router.get('/getemployeereq', async function (req, res, next) {
    let id = req.query.id
    PFGrievance.getGrivByUserId(id, function (err, grievance) {
        console.log(grievance)
        if (err) return next(err);
        res.json(grievance)
    });
})

router.get('/getemployerreq', async function (req, res, next) {
    let id = req.query.id
    PFGrievance.getAllGrivByEmployer(id, function (err, grievance) {
        console.log(grievance)
        if (err) return next(err);
        res.json(grievance)
    });
})

router.get('/getadminreq', async function (req, res, next) {
    let id = req.query.id
    PFGrievance.getAllPFGrievance(id, function (err, grievance) {
        console.log(grievance)
        if (err) return next(err);
        res.json(grievance)
    });
})

router.get('/getgrivbyid', async function (req, res, next) {
    let id = req.query.id
    PFGrievance.getGrivById(id, function (err, grievance) {
        console.log(grievance)
        if (err) return next(err);
        res.json(grievance)
    });
})

router.post('/updatequery', async function (req, res, next) {
    let obj = req.body
    obj['lastModifiedDate'] = new Date()
    console.log("update query", obj)
    PFGrievance.updateQuery(obj, function (err, grievance) {
        console.log(grievance)
        if (err) return next(err);
        res.json(grievance)
    })
})

router.post('/updatefilequery', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), async function (req, res, next) {
    let obj = req.body
    console.log("req.files['file1']", req.files['file1'])
    var tempArr1 = JSON.parse(obj['grivDoc1'])
    var tempArr2 = JSON.parse(obj['grivDoc2'])
    if (req.files['file1'] !== undefined) {
        tempArr1.push({
            formId: req.files['file1'][0].originalname,
            id: req.files['file1'][0].id,
            fileName: req.files['file1'][0].filename,
            date: new Date()
        })
    }
    if (req.files['file2'] !== undefined) {
        tempArr2.push({
            formId: req.files['file2'][0].originalname,
            id: req.files['file2'][0].id,
            fileName: req.files['file2'][0].filename,
            date: new Date()
        })
    }
    console.log(tempArr1, tempArr2)
    obj['grivDoc1'] = tempArr1
    obj['grivDoc2'] = tempArr2
    obj['lastModifiedDate'] = new Date()
    console.log("update file query", obj)
    PFGrievance.updateQuery(obj, function (err, grievance) {
        console.log(grievance)
        if (err) {
            console.log(err)
            return next(err);
        }
        res.json(grievance)
    })
})

module.exports = router;
