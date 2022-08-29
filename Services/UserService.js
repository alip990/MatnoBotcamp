const ValuesModel = require('../Models/User');
const User = ValuesModel.User;
const CodeLogin = ValuesModel.CodeLogin;

const ConvertTOHash = require("./HashService");

async function CreateUser(Name, Username, Password, MobileOrEmail) {
    Password = await ConvertTOHash(Password);
    let result = new {};
    try {
        if (MobileOrEmail.match(/^(\+98|0)?9\d{9}$/)) //is mobile
            result.data = await new User(new { Name, Username, Password, PhoneNumber: MobileOrEmail });
        if (MobileOrEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) //is email
            result.data = await new User(new { Name, Username, Password, Email: MobileOrEmail });
        if (result.data != null)
            result.isSuccess = true;
        else {
            result.isSuccess = false;
            result.message = "مقدار ورودی برای شماره موبایل یا ایمیل به درستی وارد نشده"
        }
    } catch (error) {
        result.isSuccess = false;
        result.message = "در ذخیره کاربر به مشکل برخورده ایم";
        result.log = "در ذخیره کاربر به مشکل برخورده ایم\n" + error;
        console.log(result.log);
    } finally {
        return result;
    }
}

async function Login(Username, Password) {
    Password = await ConvertTOHash(Password);
    let result = new {};
    try {
        result.data = await User.findOne({ Username, Password });
        if (result.data != null)
            result.isSuccess = true;
        else {
            result.isSuccess = false;
            result.message = "کاربر با موفقیت یافت نشد"
        }
    } catch (error) {
        result.isSuccess = false;
        result.message = "در ورود کاربر به مشکل برخورده ایم";
        result.log = "در ورود کاربر به مشکل برخورده ایم\n" + error;
        console.log(result.log);
    } finally {
        return result;
    }
}

async function EditUser(Id, Name, Username, Website, Bio, Email, PhoneNumber, Gender) {
    let result = new {};
    try {
        result.data = await User.updateOne({ Id }, { Name, Username, Website, Bio, Email, PhoneNumber, Gender });
        if (result.data != null)
            result.isSuccess = true;
        else {
            result.isSuccess = false;
            result.message = "دیتا با موفقیت دریافت نشد"
        }
    } catch (error) {
        result.isSuccess = false;
        result.message = "مشکلی در دیتابیس به وجود آمده";
        result.log = result.message + "\n" + error;
        console.log(result.log);
    } finally {
        return result;
    }
}

//وقتی کاربر جدید میخواد ساخته بشه یا کاربر میخواد اسمشو تغییر بده با ajax چک میکنیم ببینیم چنین یوزر نیمی وجود نداشته باشد
async function CheckExistUsername(Username) {
    let result = new {};
    try {
        result.data = await User.exists({ Username });
        if (result.data != null)
            result.isSuccess = true;
        else {
            result.isSuccess = false;
            result.message = "دیتا با موفقیت دریافت نشد"
        }
    } catch (error) {
        result.isSuccess = false;
        result.message = "مشکلی در دیتابیس به وجود آمده";
        result.log = result.message + "\n" + error;
        console.log(result.log);
    } finally {
        return result;
    }
}

async function CheckExistPhoneNumber(PhoneNumber) {
    let result = new {};
    try {
        result.data = await User.exists({ PhoneNumber });
        if (result.data != null)
            result.isSuccess = true;
        else {
            result.isSuccess = false;
            result.message = "دیتا با موفقیت دریافت نشد"
        }
    } catch (error) {
        result.isSuccess = false;
        result.message = "مشکلی در دیتابیس به وجود آمده";
        result.log = result.message + "\n" + error;
        console.log(result.log);
    } finally {
        return result;
    }
}

async function CheckExistEmail(Email) {
    let result = new {};
    try {
        result.data = await User.exists({ Email });
        if (result.data != null)
            result.isSuccess = true;
        else {
            result.isSuccess = false;
            result.message = "دیتا با موفقیت دریافت نشد"
        }
    } catch (error) {
        result.isSuccess = false;
        result.message = "مشکلی در دیتابیس به وجود آمده";
        result.log = result.message + "\n" + error;
        console.log(result.log);
    } finally {
        return result;
    }
}

//برای وریفای شماره تماس و ایمیل فانکشن بذار
//وقتی برای لاگین رمزشو فراموش کرده بتونه با ایمیل یا شماره تماسش لاگین بشه

// async function RegisterByEmail(UserId,){


// }