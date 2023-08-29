let userModel = require('./userModel')
//let key = '123'
//let encryptor = require('simple-encryptor')(key)

module.exports.createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        let userModelData = new userModel();

        userModelData.username= userDetails.username
        userModelData.password= userDetails.password

        // let encrypted = encryptor.encrypt(buyerDetails)

        userModelData.save()
        .then((result) => resolve(result))
        .catch((err) =>  reject(err) )
    })
}


module.exports.loginUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ username: userDetails.username })
        .then((result) => {
            if(result != undefined && result != null) {
                if(result.password == userDetails.password) {
                    resolve({ status: true, msg: `User Login Successfully`})
                } else {
                   resolve({ status: false, msg: `Wrong password`})
                }
            } else {
                resolve({ status: false, msg: `No user found`})
            }
        })
        .catch((error) => reject({ status: false, msg: `Invalid data ${ error }}`}))
    })
}