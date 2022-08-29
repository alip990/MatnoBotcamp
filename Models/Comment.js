const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const Comment = mongoose.model("Comment", {
    _id: { type: String, default: cuid },
    Text: String,


    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, //کاربری که این کامنتو میذاره
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }, //این کامنت مربوط به چه پستی هستش
    ParentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    }, //روی کامنت دیگری ریپلای شده است؟اگر نه نال باشه
});

module.exports.Comment = Comment;