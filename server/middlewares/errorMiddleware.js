const routeNotFound =( req, res , next )=>{
    const error = new Error(`route not found : ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === "castError" && err.kind === "objectId"){
        statusCode = 404;
        message = "Resource not found";

    }

    req.status(statusCode).json9({
        message,
        stack : process.env.NODE_ENV === "production" ? null : err.stack,
    });


};

export { routeNotFound, errorHandler };

