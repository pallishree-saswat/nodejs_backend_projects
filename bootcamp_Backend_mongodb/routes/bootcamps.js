const express = require('express');

const {protect, authorize } = require('../middleware/auth')

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

//Include other resource routers
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults')

const router = express.Router();

//Re-router 
router.use('/:bootcampId/courses' , courseRouter)

router.get('/',advancedResults(Bootcamp, 'courses') ,getBootcamps)
router.get('/:id', getBootcamp)
router.post('/',protect, authorize('publisher', 'admin'), createBootcamp);
router.put('/:id',protect, authorize('publisher', 'admin'), updateBootcamp);
router.put('/:id/photo',protect, authorize('publisher', 'admin'), bootcampPhotoUpload);
router.delete('/:id',protect, authorize('publisher', 'admin'), deleteBootcamp);
router.get('/radius/:zipcode/:distance', getBootcampsInRadius) 

module.exports = router;