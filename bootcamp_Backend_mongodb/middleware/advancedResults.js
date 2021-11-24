const advancedResults = (model, populate) => async (req,res,next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query };

    //fields to exclude from query because we dont want to match these with our document.. we want
    //to execute it
    const removeFields = ['select', 'sort',, 'page', 'limit'];

    //Loop over removeFields and delete from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

       console.log(reqQuery)


    //Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    //Create operators ($gt = greater than $lte= less than equal , in = excatly in etc..)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //Finding resources
    query = model.find(JSON.parse(queryStr));

    //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    //Sorting
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1; //default page is 1
    const limit = parseInt(req.query.limit, 10) || 100 ; // per page limit of resourse is 100 let say
    const startIndex = (page -1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();  

    query = query.skip(startIndex).limit(limit)

    //populate
    if(populate) {
        query = query.populate(populate)
    }
  
    //Executing query
      const results = await query;
     
    //pagination result
    const pagination = {};
    
    //next page
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    //prev page
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.advancedResults = {
        success : true,
        count : results.length,
        pagination,
        data : results
    }

    next()
     
}

module.exports = advancedResults;