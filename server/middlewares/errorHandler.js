import errorCode from "../helper/errorCode.js";

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case errorCode.BAD_REQUEST:
            res.json({
                title: "Bad Request",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case errorCode.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case errorCode.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case errorCode.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case errorCode.RATE_LIMIT:
            res.json({
                title: "RateLimitExceeds",
                message: "To Many Requests, Rate Limit Exceeds",
                stackTrace: err.stackTrace
            })
            break;
        case errorCode.SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        default:
            // console.log(err)
            res.status(500).json({
                title: "Uncaught",
                message: err.message,
                stackTrace: err.stackTrace,
                status: res.statusCode
            })
    }
}


export default errorHandler