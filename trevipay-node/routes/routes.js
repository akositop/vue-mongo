let express = require('express')

let userController = require('../src/user/userController')
let buyerController = require('../src/buyers/buyerController.js')
const router = express.Router()

router.route('/user/login').post(userController.loginUserControllerFn)
router.route('/user/create').post(userController.createUserControllerFn)

//Home transactions
router.route('/buyer/getAllBuyers').get(buyerController.getAllBuyersControllerFn)
router.route('/buyer/getBuyerById').post(buyerController.getBuyerByBuyerIdFn)
router.route('/buyer/create').post(buyerController.createBuyerControllerFn)
router.route('/buyer/update/:buyerId').patch(buyerController.editBuyerByBuyerIdFn)

module.exports = router;