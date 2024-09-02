class AppError extends Error{
    constructor(message , statusCode){
        super(message);
        this.statusCode = statusCode;
    }

};


export const errorMiddleWare = (err , req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error."

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new AppError(message , err.statusCode);
    }
    if(err.code === "11000"){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`
        err = new AppError(message , err.statusCode);
    }

    return res.status(err.statusCode).json(
        {
            success: false,
            message : err.message,
            err : err
        }
    )
} 

export default AppError;