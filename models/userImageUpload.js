const mongoose = require("mongoose");
const Yup = require('yup'); 
const user = require('./user');

const {schema} = require('./security/userImageUploadValidation');

const imageSchema = new mongoose.Schema({
   
    image:{
        type: String,
        required: [true,"ادرس تصویر  الزامی است"],
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    type:{
        type: String,
        required: [true,"ادرس تصویر  الزامی است"],
        default:"post",
        enum: ["post", "profile"],
    }
    
    
    
});

//#region Static function
imageSchema.statics.imageValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

//#endregion
const image = mongoose.model("imageUpload", imageSchema);
module.exports = image;