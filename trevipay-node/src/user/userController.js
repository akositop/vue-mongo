let userService = require('./userService')

let createUserControllerFn = async(req, res) => {
    try {
        let status = await userService.createUserDBService(req.body)

        if(status) {
            res.send({"status": true, "message": "User created successfully"})
        }else {
            res.send({"status": true, "message": "User creation failed"})
        } 
    } catch (error) {
        console.log(error)
    }
}

let loginUserControllerFn = async(req, res) => {
    try {
        let result = await userService.loginUserDBService(req.body)
        
        if(result.status) {
            res.send({"status": true, "message": result.msg })
        }else {
            res.send({"status": false, "message": result.msg })
        } 
    } catch (error) {
        console.log(error)
        res.send({"status": false, "message": error.msg })
    }
}

module.exports = { createUserControllerFn, loginUserControllerFn }