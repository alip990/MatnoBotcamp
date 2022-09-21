const mongoose = require("mongoose");
const postUpload = require('./userImageUpload');

const {schema} = require('./security/userValidation');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true,"نام و نام خوانوادگی الزامی می باشد"],
        trim: true,
    },
    email: {
        type: String,
        required: [true,"ایمیل الزامی است"],
        unique: [true,"ایمیل مورد نظر قبلا استفاده شده است"],
    },
    password: {
        type: String,
        required: [true,"پسورد الزلمی است"],
        minlength: 4,
        maxlength: 255,
        
    },
    phone:{
        type: String,
        required: [true,"شماره تلفن الزامی است"],
        minlength: 11,
        maxlength: 11,
        unique: [true,"شماره تلفن تکراری است"],
    },
    userName:{
        type: String,
        required: [true,"نام کاربری الزلمی است"],
        minlength: 4,
        maxlength: 255,
        unique: [true,"باید نام کاربری یونیک انتخاب کنید"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    imageUpload:
       
            [{type: mongoose.Schema.Types.ObjectId,ref:'imageUpload'}]
       
    
    
});

//#region Static function
userSchema.statics.userValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

//#endregion
const User = mongoose.model("users", userSchema);
module.exports = User;