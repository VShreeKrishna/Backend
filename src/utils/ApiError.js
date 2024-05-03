class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong!",
        errors = [],
        stack = ""
    ){
        super(message)
        this.stausCode = statusCode     //overide 
        this.data = null
        this.errors = errors
        this.message = message
        this.success = false

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {ApiError};