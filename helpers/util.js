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
 * 
 * @param {Object} data - contains the files
 * @returns {(array|Object)} the file names uploaded
 */
exports.fileUploads = (data) => {
    if(!data || Object.keys(data).length === 0){
        return {
            success: false,
            message: "No files were uploaded"
        }
    }

    let photos = data.photos
    let collectPhotos = []
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

    return collectPhotos
}