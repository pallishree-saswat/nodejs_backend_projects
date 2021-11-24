const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse'); 
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

//Get all course 
//Get api/courses/bootcamps/:bootcampId/courses
exports.getCourses = asyncHandler(async(req,res,next) => {

    if(req.params.bootcampId) {
       const courses =  await Course.find({bootcamp : req.params.bootcampId});

       return res.status(200).json({
        success : true,
        count : courses.length,
        data : courses

    })

    } else {
       res.status(200).json(res.advancedResults)
    }

})

//get single course by id
//GET api/courses/:id

exports.getCourse = asyncHandler(async(req,res,next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if(!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        );
    }

    res.status(200).json({
        success : true,
        data : course
    })
})

//add a course
//POST api/bootcamps/:bootcampId/course

exports.addCourse = asyncHandler(async(req,res,next) => {

    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
      

    if(!bootcamp) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.bootcampId}`),
            404
        );
    }

      // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
        401
      )
    );
  }


   const course = await Course.create(req.body)


    res.status(200).json({
        success : true,
        data : course
    })
})

//update a course
//PUT api/courses/:id

exports.updateCourse = asyncHandler(async(req,res,next) => {

    let course = await Course.findById(req.params.id);

    if(!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        );
    }
     // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course ${course._id}`,
        401
      )
    );
  }

      course = await Course.findOneAndUpdate(req.params.id, req.body , {
       new: true,
       runValidators: true
   });


    res.status(200).json({
        success : true,
        data : course
    });
});

//update a course
//DELETE api/courses/:id

exports.deleteCourse = asyncHandler(async(req,res,next) => {

   const course = await Course.findById(req.params.id);

    if(!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        );
    }

     // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course ${course._id}`,
        401
      )
    );
  }
   await course.remove()

    res.status(200).json({
        success : true,
        data : {}
    });
});