const {Media} = require("../models/media");
const cloudinary = require("../config/config");

exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const { title, description } = req.body;  // Get form-data fields

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const newMedia = new Media({
            filename: req.file.originalname,
            fileUrl: result.secure_url,
            fileType: req.file.mimetype,
            title,  
            description
        });

        await newMedia.save();
        res.json({ message: "File uploaded successfully", media: newMedia });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error });
        console.log(error)
    }
};
