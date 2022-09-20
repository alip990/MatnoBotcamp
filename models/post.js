const mongoose = require("mongoose");
const Yup = require('yup'); 

const user = require('./user');
const image = require('./userImageUpload');

const {schema} = require('./security/postValidation');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"عنوان پست الزامی می باشد"],
        trim: true,
    },
    caption: {
        type: String,
        required: [true,"کپشن پست الزامی است"],
        trim: true,
    },
    imageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: image,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

//#region Static function
postSchema.statics.postValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

//#endregion
const post = mongoose.model("post", postSchema);
module.exports = post;