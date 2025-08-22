import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req, res) => {

    // get user details from frontend
    const {fullname, email, username, password} = req.body


    // validations - (should not be empty)
    if( [fullname, email, username, password].some((field) => field?.trim() === "") 
    ) {
    throw new ApiError(400, "All fields are required!!")
    }


    // check if user already exists (on basis of email and username)
    const existedUser = await User.findOne({
        $or: [ {username}, {email} ]
    })

    if(existedUser) {
        throw new ApiError(409, "Email or Username already exists")
    }


    // check for images, check for avater (required for this)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }   


    // upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    
    if (!avatar) {
        throw new ApiError(400, "Avatar file required")
    }


    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    
    // check for user creation
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    // return a response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
} )

export {registerUser}