/**
 * Fix names in better format "john doe" to "John Doe"
 * 
 * @param {string} data - to be converted/fixed
 * @returns {string} new name
 */
exports.fixedName = (data) => {
    let nameArr = data.split(' ')
    let newName = ""

    nameArr.forEach(element => {
        newName += element.charAt(0).toUpperCase() + element.slice(1) + " ";
    });

    return newName.trimEnd()
}

/**
 * Pass a number of characters and it will generates a random string
 * 
 * @param {number} count 
 * @returns {string} random string with a length of [count]
 */
exports.generateRandomString = (count) =>{
    return Math.random()
        .toString(36)
        .substring(2, count + 2);
}

/**
 * upload images here
 * ! This application works on express file-upload package
 * @param {Object} files - contains the files
 * @returns {(array|Object)} the file names uploaded
 */
exports.fileUploads = (files) => {
    let collectPhotos = []

    if(!files || Object.keys(files).length === 0){
        return {
            success: false,
            message: "No files were uploaded"
        }
    }else if(Object.keys(files).length === 1){
        let fileNameExtension = files.photos.name.split('.')[1]
        let newFileName = this.generateRandomString(20) + "." + fileNameExtension
        let path = `./public/images/${newFileName}`

        collectPhotos.push(newFileName)

        files.photos.mv(path, err => {
            if(err){
                return {
                    success: false,
                    message: err
                }
            }
        })

        return {
            success: true,
            message: "",
            photos: collectPhotos
        }
    }else{
        let photos = files.photos
        photos.forEach(photo => {
            let fileNameExtension = photo.name.split('.')[1]
            let newFileName = this.generateRandomString(20) + "." + fileNameExtension
            let path = `./public/images/${newFileName}`

            collectPhotos.push(newFileName)

            photo.mv(path, err => {
                if(err){
                    return {
                        success: false,
                        message: err
                    }
                }
            })
        });

        return {
            success: true,
            message: "",
            photos: collectPhotos
        }
    }
}

/**
 * upload images here
 */

exports.imageUploads = (files) => {
    let photos = []
    files.forEach(file => {
        let fileNameExtension = file.originalname.split(".")[1] // get extension of the file

        photos.push("/images/" + file.filename + "." + fileNameExtension)
    });

    return photos
}