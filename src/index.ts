if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const AppError = require('../utils/AppError.js')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();
const hpp = require('hpp')
const methodOverride = require('method-override')

let business = require('./service/business/businessController')
let product = require('./service/business/products/productController')
let store = require('./service/store/storeController')
let inventory = require('./service/store/inventory/inventoryController')
var port = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const corsConfig = {
    "origin": process.env.ALLOWED_CORS_URLS,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
}

app.use(cors(corsConfig))
app.use(cookieParser());
app.use(express.json())
app.use(methodOverride('_method'))
app.use(helmet())


app.use('/api', business)
app.use('/api', product)
app.use('/api', store)
app.use('/api', inventory)


app.get('/', (req: any, res: any) => {
    res.send('Check was successful');
  
})

app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404)))

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
         status: err.status,
         message: err.message
    })
})


    app.listen(port, function () {
        console.log("Running RestHub on port " + port);
      })
