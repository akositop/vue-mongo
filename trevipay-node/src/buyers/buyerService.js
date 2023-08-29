let buyerModel = require('./buyerModel')

module.exports.createBuyerDBService = (buyerDetails) => {
    return new Promise((resolve, reject) => {
        let buyerModelData = new buyerModel();

        buyerModelData.buyerId= buyerDetails.buyerId
        buyerModelData.name= buyerDetails.name
        buyerModelData.email= buyerDetails.email
        buyerModelData.status= buyerDetails.status

        // let encrypted = encryptor.encrypt(buyerDetails)

        buyerModelData.save()
        .then((result) => resolve(result))
        .catch((err) =>  reject(err) )
    })
}

module.exports.getAllBuyersDBService = () => {
    return new Promise((resolve, reject) => {
        buyerModel.find({ })
        .then((result) => {
            resolve(result)
        })
        .catch((error) => reject({ status: false, msg: `Invalid data ${ error }}`}))
    })
}

module.exports.getBuyerByBuyerIdDBService = (buyerDetails) => {
    return new Promise((resolve, reject) => {
        buyerModel.findOne({ buyerId: buyerDetails.buyerId })
        .then((result) => {
            if(result != undefined && result != null) {
                resolve(result)
            } else {
                resolve({ status: false, msg: `No user found`})
            }
        })
        .catch((error) => reject({ status: false, msg: `Invalid data ${ error }}`}))
    })
}

module.exports.editBuyerByBuyerIdDBService = (buyerDetails) => {
    return new Promise((resolve, reject) => {
        if(buyerDetails.body.status == true) {
            buyerModel.updateOne({ buyerId: buyerDetails.params.buyerId } ,{
                $set: {
                    email: buyerDetails.body.email,
                    status: buyerDetails.body.status
                }
            })
            .then((result) => {
                if(result != undefined && result != null) {
                    resolve(result)
                } else {
                    reject({ status: false, msg: `Update Transaction Failed`})
                }
            })
            .catch((error) => reject({ status: false, msg: `Invalid data ${ error }}`}))
        }
    })
}