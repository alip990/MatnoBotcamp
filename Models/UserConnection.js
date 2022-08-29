const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const UserConnection = mongoose.model("User_Connection", {



    FalowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, //for user
    FallowingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, // for user

});

module.exports.UserConnection = UserConnection;