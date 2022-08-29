const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");

//رابطه پست و کاربر هایی که لایکش کردن
const PostUserLike = mongoose.model("Post_User_Like", {


    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

module.exports.PostUserLike = PostUserLike;