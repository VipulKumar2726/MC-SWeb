const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({

    filename: String,
    fileUrl: String,
    fileType: String,
    title: String,
    description: String,
    // user: {
    //     type: Schema.Types.ObjectId,  
    //     ref: "User"
    // },

    uploadedAt: { type: Date, default: Date.now }
   
},{timestamps: true})

const Media = mongoose.model("Media",mediaSchema);

module.exports = {
    Media,
}

