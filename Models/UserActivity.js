const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");



const UserActivity = mongoose.model("User_Activity", {
    _id: { type: String, default: cuid },
    Title: String,

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, //این فعالیت یا گزارش برای چه کاربری هستش
    //بعدی ها باید نال پذیر باشن
    UserActiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, //اگر کاربری در ان دخیل بوده میخوایم ایدیشو پیدا کنیم
    PostActiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }, //اگر مرتبط به پستی هستش مثلا پست کاربرمون رو یکی لایک کرده میخوایم گزارش بدیم
    CommentActiveId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    } //... 
});

module.exports.UserActivity = UserActivity;