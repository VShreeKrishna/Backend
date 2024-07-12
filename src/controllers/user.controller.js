import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'

const registerUser = asyncHandler( async(req,res)=>{

    const {fullname,username,email,password } =req.body
    console.log("email:" ,email)

    if(
        [fullname, username, email, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All field are required")
    }
})

export {registerUser}