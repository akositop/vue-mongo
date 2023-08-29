const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
let routes = require('./routes/routes')
mongoose.set('strictQuery', false)

app.use(cors())


//Node connection
app.listen(3000, check = (err) => {
        if(err) {
            console.log(`ERROR: ${ err } `)
        } else {
            console.log(`Server Started`)
        }
    }
)

mongoose.connect("mongodb://127.0.0.1:27017/trevipay", { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => console.log('Connected to DB successfully'))
    .catch((err) => { console.error(err) })

app.use(express.json({ limit: '500mb' }))
app.use(routes)