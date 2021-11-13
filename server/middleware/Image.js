var multer = require('multer');

const storage = () => {
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file + '-' + Date.now())
        }
    });
    return storage
}


module.exports = {
    storage
}