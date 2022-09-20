const mongoose = require("mongoose");

const user = require('./user');
const post = require('./post');

const {schema} = require('./security/commentValidation');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true,"عنوان پست الزامی می باشد"],
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: post,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

//#region Static function
commentSchema.statics.commentValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

//#endregion
const comment = mongoose.model("comment", commentSchema);
module.exports = comment;