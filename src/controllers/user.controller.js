import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async(req,res)=>{

    const {fullname,username,email,password } =req.body
    console.log("email:" ,email)

    if(
        [fullname, username, email, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All field are required")
    }

    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, " User with email or the username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400," Avatar files is required ")
    }
         
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  if(!avatar){
    throw new ApiError(400,"Avatar files is required")
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createUser = await User.findById(user._id).select("-password -refreshToken")

  if(!createUser){
    throw new ApiError(500, " Something went wrong while registering a user")
  }

  return res.status(201).json(
    new ApiResponse(201, createUser, "User registered successfully")
  )
})

export {registerUser}