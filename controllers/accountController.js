const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//#region create user
exports.createUser = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, userName } = req.body;
    await User.userValidation(req.body);
    let isEmailExist = await User.findOne({ email });
    let isUserNameExit = await User.findOne({ userName });
    let isPhoneExit = await User.findOne({ phone });
    if (isEmailExist) {
      const error = new Error(" کاربری با این ایمیل وجود دارد");
      error.statusCode = 404;
      throw error;
    } else if (isUserNameExit) {
      const error = new Error(" کاربری با این نام کاربری وجود دارد");
      error.statusCode = 404;
      throw error;
    } else if (isPhoneExit) {
      const error = new Error(" کاربری با این شماره تلفن  وجود دارد");
      error.statusCode = 404;
      throw error;
    } else {
      const hash = await bcryptjs.hash(password, 3);

      await User.create({ fullName, email, password: hash, phone, userName });

      res.status(201).json({ meggage: "با موفقیت ثبت شد" });
    }
  } catch (err) {
    next(err);
  }
};
//#endregion

//#region login
exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("کاربری با این ایمیل یافت نشد");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcryptjs.compare(password, user.password);

    if (isEqual) {
      const token = jwt.sign(
        {
          user: {
            userId: user._id.toString(),
            email: user.email,
            fullname: user.fullname,
          },
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ token, userId: user._id.toString() });
    } else {
      const error = new Error("آدرس ایمیل یا کلمه عبور اشتباه است");
      error.statusCode = 422;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
//#endregion
