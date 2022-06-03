if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const hpp = require('hpp')

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
app.use(helmet())


app.get('/', (req: any, res: any) => {
    res.send('Check was successful');
  
})

// app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404)))

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
