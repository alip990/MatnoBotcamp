const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const Post = mongoose.model("Post", {
    _id: { type: String, default: cuid },
    Caption: String,

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    } //کاربر سازنده این پست

});

module.exports.Post = Post;