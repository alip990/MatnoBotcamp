const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const PostTagRelation = mongoose.model("Post_Tag_Rel", {

    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    TagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    },

});

module.exports.PostTagRelation = PostTagRelation;