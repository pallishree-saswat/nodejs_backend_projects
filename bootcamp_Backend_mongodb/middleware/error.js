const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
 
    let error = { ...err }

    error.message = err.message;

    //Log to console for dev
     //console.log(err.stack);

     //improper id  
     //Mongoose bad ObjectId
     if(err.name === 'CastError'){
         const message = `Resource is not found with this id ${err.value}`;
         error = new ErrorResponse(message, 404)
     }

     // Mongoose Duplicate Key Error or mongoError
     if(err.code === 11000){
         const message = 'Duplicate filed value entered'
         error = new ErrorResponse(message, 400)

     }

     //Mongoose validation  Error

     if(err.name === 'ValidationError'){
         const message = Object.values(err.errors).map(val => val.message)
         error = new ErrorResponse(message, 400)
     }
    

     res.status(error.statusCode ||  500).json({ 
         success : false ,
          error: error.message || 'Server Error' 
        });

   

}

module.exports = errorHandler;