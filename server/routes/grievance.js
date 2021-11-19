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

router.post('/query', upload.fields([{ name: 'panImg', maxCount: 1 }, { name: 'aadharImg', maxCount: 1 }]), async function (req, res, next) {
})
