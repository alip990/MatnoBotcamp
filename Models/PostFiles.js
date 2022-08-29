const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const PostFiles = mongoose.model("Post_Files", {
    _id: { type: String, default: cuid },
    Url: String,
    FileType: {
        type: String,
        enum: ["Image", "Video"],
        required: true,
        default: "Image"
    },
    Format: {
        type: String,
        enum: [".jpg", ".jpeg", ".png", ".mkw", ".webm", ".mp4", ".m4p", ".m4p", ".wmv", ".gif"],
        required: true,
        validate: {
            validator: (val) => {
                if ((val == ".jpg" || val == ".jpeg" || val == ".png") && this.FileType != "Image")
                    return false;
                return true;
            },
            message: "فرمت با نوع ورودی برابر نیست"
        }
    },

    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }

});

module.exports.PostFiles = PostFiles;