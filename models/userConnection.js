const mongoose = require("mongoose");
const user = require('./user');


const userConnectionSchema = new mongoose.Schema({
    
    FalowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }, //for user
    FallowingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }, // for user

});


const UserConnection = mongoose.model("userConnection", userConnectionSchema);
module.exports = UserConnection;