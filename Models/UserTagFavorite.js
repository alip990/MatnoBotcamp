const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const UserTagFavorite = mongoose.model("User_Tag_Favorite", {


    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    TagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    }

});

module.exports.UserTagFavorite = UserTagFavorite;