const UserService = require("../Services/UserService");

async function checkSignIn(req, res, next) {

    if (req.session.user == null || req.session.user == undefined) {
        next(new Error("شما لاگین نشده اید"))
        return;
    } else if (req.session.user._id == null) {
        next(new Error("شما لاگین نشده اید"))
        return;
    }
    let result = await UserService.CheckExistById(req.session.user._id);

    if (result.isSuccess) {
        next(); //If session exists, go to page
    } else {
        var err = new Error(result.message);

        next(err); //Error,  unauthorized page!
    }
}

module.exports.checkSignIn = checkSignIn;