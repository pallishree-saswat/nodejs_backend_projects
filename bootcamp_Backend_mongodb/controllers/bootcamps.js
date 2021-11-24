const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse'); 
const geocoder = require('../utils/geoCoder');
const path = require('path')




//Get All bootcapms
//GET /api/bootcamps

exports.getBootcamps = asyncHandler( async (req,res,next) => {

 res.status(200).json(res.advancedResults) 
   
});

//Get single bootcamp by id
//GET /api/bootcamps/:id

exports.getBootcamp = asyncHandler(async (req,res,next) => {

       const bootcamp = await Bootcamp.findById(req.params.id)

       if(!bootcamp){
           return  next(
               //this error will come if the id is  formatted correctly but not actually in database
            new ErrorResponse(`Bootcamp is not found with id of ${req.params.id}`, 404)
        )
       }
       res.status(200).json({success: true, data : bootcamp}) 
  
 });
//Create bootcapms
//POST /api/bootcamps

exports.createBootcamp = asyncHandler(async (req,res,next) => {

    //add user to req.body
    req.body.user = req.user.id

    //check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({user : req.user.id});

    //if the user is not an admin , they can only add one bootcamp
    if(publishedBootcamp && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `the user with ID ${req.user.id} has already published a bootcamp`,400
            )
        )
    }

        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success: true,
            data: bootcamp
        });
   
});


//Update bootcapms
//PUT /api/bootcamps/:id

exports.updateBootcamp = asyncHandler( async (req,res,next) => {


       let bootcamp =await Bootcamp.findById(req.params.id);
    
        if(!bootcamp){
            return  next(
                //this error will come if the id is  formatted correctly but not actually in database
             new ErrorResponse(`Bootcamp is not found with id of ${req.params.id}`, 404)
         )
        }

        //make sure user is the bootcamp owner
        if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(
                new ErrorResponse(
                    `User ${req.params.id} is not authorized to update this bootcamp`
                )
            )
        }

        //update bootcamp if user is owner
        bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body , {
            new:true,
            runValidators:true
        })
        
        res.status(200).json({success : true , data : bootcamp})
   
  
})

//Delete bootcapms
//DELETE /api/bootcamps/:id

exports.deleteBootcamp = asyncHandler(async (req,res,next) => {
 
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        if(!bootcamp){
            return  next(
                //this error will come if the id is  formatted correctly but not actually in database
             new ErrorResponse(`Bootcamp is not found with id of ${req.params.id}`, 404)
         )
        }

            //make sure user is the bootcamp owner
            if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
                return next(
                    new ErrorResponse(
                        `User ${req.params.id} is not authorized to delete this bootcamp`
                    )
                )
            }

        bootcamp.remove();
        
        res.status(200).json({success : true , data : {}})
    });

//Get bootcamps within a radius
//DELETE /api/bootcamps/radius/:zipcode/:distance
exports.getBootcampsInRadius = asyncHandler (async (req,res,next) => {
 
    const {zipcode , distance} = req.params;

    //get lat/lang from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calc radius using  radius
    //Divide dist by radius of Earth
    //Earth radius  = 3,663 mi
    const radius = distance / 3963;

    const bootcapms = await Bootcamp.find({
        location : {$geoWithin : {$centerSphere : [ [ lng, lat], radius ]}}
    });

    res.status(200).json({
        success : true,
        count : bootcapms.length,
        data: bootcapms
    })
 
})

//Upload file upload /photo upload
//POST /api/bootcamps/:id/photo

exports.bootcampPhotoUpload = asyncHandler(async (req,res,next) => {
 
    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
        return  next(
            //this error will come if the id is  formatted correctly but not actually in database
         new ErrorResponse(`Bootcamp is not found with id of ${req.params.id}`, 404)
     )
    }

    //make sure user is the bootcamp owner
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this bootcamp`
            )
        )
    }


if(!req.files) {
    return  next( new ErrorResponse(`Please upload a file`, 400));
}

const file = req.files.file;

//Make sure the image is a photo
if(!file.mimetype.startsWith('image')) {
    return  next( new ErrorResponse(`Please upload an image file`, 400));
}

//check file size
if(file.size > process.env.MAX_FILE_UPLOAD) {
    return  next( new ErrorResponse(`Please upload an image less than
     ${process.env.MAX_FILE_UPLOAD}`, 400));
}

//create custom filename
file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if(err){
        console.log(err)
        return  next( new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findOneAndUpdate(req.params.id, {photo : file.name});

    res.status(200).json({
        success : true,
        data: file.name
    });
});


});