const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");


const User = mongoose.model("User", {
    _id: { type: String, default: cuid },
    Name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    Username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        validate: {
            validator: (val) => {
                var regxPhone = /^\w*$/;
                return regxPhone.test(val);
            },
            message: "ایمیل وارد شده درست نمیباشد"
        }
    },
    Password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    Email: {
        type: String,
        // required: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        validate: {
            validator: (val) => {
                var regxPhone = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return regxPhone.test(val);
            },
            message: "ایمیل وارد شده درست نمیباشد"
        }
    },
    PhoneNumber: {
        type: String,
        // required: true,
        minlength: 10,
        maxlength: 12,
        unique: true,
        validate: {
            validator: (val) => {
                var regxPhone = /^(\+98|0)?9\d{9}$/;
                return regxPhone.test(val);
            },
            message: "شماره وارد شده درست نمیباشد"
        }
    },
    Website: {
        type: String,
        // required: true,
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: (val) => {
                var regxEmail = /^(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
                return regxEmail.test(val);
            },
            message: "آدرس سایت وارد شده درست نمیباشد"
        }
    },
    EmailVerified: {
        type: Boolean,
        default: false,
        required: true,
        // validate: {
        //     validator: (val) => {
        //         if (this.Email == "" || this.Email == null || this.Email == undefined)
        //             return false;
        //         return true;
        //     },
        //     message: "ایمیلی برای وریفای شدن وجود ندارد"
        // }
    },
    PhoneNumberVerified: {
        type: Boolean,
        default: false,
        required: true,
        // validate: {
        //     validator: (val) => {
        //         if (this.Email == "" || this.Email == null || this.Email == undefined)
        //             return false;
        //         return true;
        //     },
        //     message: "شماره تلفنی برای وریفای شدن وجود ندارد"
        // }
    },
    Bio: String,
    Gender: {
        type: String,
        enum: ["Mam", "Woman"],
        // required: true,
    },
    BlueTick: {
        type: Boolean,
        default: false
    },
    ProfilePhotoUrl: String,


    UserSetting: { type: String }
});

const CodeLogin = mongoose.model("CodeLogin", {
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    codeNumber: {
        type: Number,
        maxlength: 5,
        minlength: 5,
        required: true
    },
    SendTime: {
        type: Date,
        default: new Date(),
        required: true
    },
    TypeLogin: {
        type: String,
        enum: ["Email", "PhoneNumber"],
        required: true
    },
    EmailOrPhoneNummber: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                var regxPhone = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}|(\+98|0)?9\d{9})$/;
                return regxPhone.test(val);
            },
            message: "شماره یا ایمیل درست نمیباشد"
        }
    }


})
module.exports.User = User;
module.exports.CodeLogin = CodeLogin;