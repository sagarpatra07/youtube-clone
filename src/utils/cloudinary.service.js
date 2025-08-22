import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import path from 'path';


// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try{                     
            if(!localFilePath) return null

            // Convert Windows backslashes → forward slashes
            try{
                localFilePath = path.resolve(localFilePath).replace(/\\/g, "/");
            } catch (error) {
                console.log(error);
            }
            
            
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            }).catch((error) => {
                console.log("uploading failed...",error);
            });
            
            
            //file has been uploaded successfully
            // console.log('file is uploaded on cloudinary', response.url);
            fs.unlinkSync(localFilePath) //removes the locally saved temp file
            return response;
            
        } catch (error) {
            fs.unlinkSync(localFilePath) //removes the locally saved temp file
            return null;
        }
    }

export {uploadOnCloudinary}