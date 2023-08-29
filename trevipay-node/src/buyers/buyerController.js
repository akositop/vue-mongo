let buyerService = require('./buyerService')

let createBuyerControllerFn = async(req, res) => {
    try {
        let status = await buyerService.createBuyerDBService(req.body)

        if(status) {
            res.send({"status": true, "message": "Buyer created successfully"})
        }else {
            res.send({"status": true, "message": "Buyer creation failed"})
        } 
    } catch (error) {
        console.log(error)
    }
}

let getAllBuyersControllerFn = async(req, res) => {
    try {
        let result = await buyerService.getAllBuyersDBService(req.body)

        if(result) {
            res.send({
                data: result
            })
        }else {
            res.send({"status": true, "message": "Cannot fetch the buyers lists"})
        } 
    } catch (error) {
        console.log(error)
    }
}

let getBuyerByBuyerIdFn = async(req, res) => {
    try {
        let result = await buyerService.getBuyerByBuyerIdDBService(req.body)

        if(result) {
            res.send({
                data: result
            })
        }else {
            res.send({"status": true, "message": "Cannot fetch the buyer"})
        } 
    } catch (error) {
        console.log(error)
    }
}

let editBuyerByBuyerIdFn = async(req, res) => {
    try {
        let result = await buyerService.editBuyerByBuyerIdDBService(req)
        if(result) {
            res.send({
                data: result
            })
        }else {
            res.send({"status": true, "message": "Cannot fetch the buyer"})
        } 
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createBuyerControllerFn, getAllBuyersControllerFn, getBuyerByBuyerIdFn, editBuyerByBuyerIdFn }