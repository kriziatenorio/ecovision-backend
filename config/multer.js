const multer = require('multer')
const { generateRandomString } = require('../helpers/util')

exports.storage = (dest) => {
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest) // * pass the path here
        },
        filename(req, file, callback) {
            // let filename = file.originalname;
            // let fileNameExtension = filename.split(".")[1]
            // let newFileName = generateRandomString(12) + "." + fileNameExtension
            
            // callback(null, newFileName)
            callback(null, file.originalname)
        }
    })
}