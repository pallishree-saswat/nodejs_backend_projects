const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp')
const cors = require('cors')
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db')



//load env variables and we can access vars from dotenv by writting process.env.variablename
dotenv.config({path : './config/config.env'});

//connect to database
connectDB();

//Routes files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews');

//initialize express
const app = express()

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//file upload
app.use(fileupload())

//sanitize data
app.use(expressMongoSanitize())

//add security headers
app.use(helmet());

//prevent xss(cross site scripting in input) attacks
app.use(xss())

//Rate limiting of request
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000 , // 10min
    max:100
})

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//enable CORS
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser());

//mount routes
app.use('/api/bootcamps' ,bootcamps)
app.use('/api/courses' ,courses)
app.use('/api/auth' ,auth)
app.use('/api/users' ,users)
app.use('/api/reviews' ,reviews)

app.use(errorHandler);
//port
PORT = process.env.PORT || 5000 

//listen to server
const server = app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

//Handle unhandled promise rejection
process.on('unhandledRejection',(err,promise) => {
    console.log(`Error : ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1))
})
