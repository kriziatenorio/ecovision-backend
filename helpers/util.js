const fixedName = (name) => {
    let nameArr = name.split(' ')
    let newName = ""

    nameArr.forEach(element => {
        newName += element.charAt(0).toUpperCase() + element.slice(1) + " ";
    });

    return newName.trimEnd()
}

module.exports = fixedName