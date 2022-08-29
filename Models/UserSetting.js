const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const UserSetting = mongoose.model("User_Setting", {
    _id: { type: String, default: cuid },
    IsShowPhoneNumber: {
        type: Boolean,
        required: true,
        default: true
    },
    IsShowEmail: {
        type: Boolean,
        required: true,
        default: false
    },


    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

module.exports.UserSetting = UserSetting;