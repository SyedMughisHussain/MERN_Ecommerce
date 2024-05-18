import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: "dadvcuwkk", 
    api_key: "593186932939832", 
    api_secret: "PFPudJmXD9rckaWhJ6RP7e7Cf6M" // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }

