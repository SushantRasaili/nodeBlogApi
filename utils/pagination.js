function pagination(model) {
    return async (req,res,next) => {
        const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1)*limit;
    const endIndex = page * limit;

    const results = { };

    if(endIndex < await model.countDocuments().exec()) {
        results.next = page + 1;
    }

    if(startIndex > 0) {
        results.previous = page - 1;
    }

    try {
        results.result = await model.find().limit(limit).skip(startIndex);
        res.paginatedResults = results;
        next();
    }
    catch(err) {
        res.status(500).json(err);
    }
    }
}

module.exports = {pagination};