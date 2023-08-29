let mongoose = require('mongoose')
let Schema = mongoose.Schema

var buyerSchema = new Schema({
    buyerId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('buyer', buyerSchema)