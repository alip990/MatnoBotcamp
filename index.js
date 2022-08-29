//#region startup
const app = require("express")();
const bodyParser = require("body-parser");


const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.secret }));

const port = "5000";
const hostname = "localhost";
const UserService = require("./Service").UserService;
//#endregion
//#region Middlewares
async function checkSignIn(req, res, next) {
    console.log("Check sign in")
    console.log(req.session.user)
    if (req.session.user == null || req.session.user == undefined) {
        next(new Error("شما لاگین نشده اید"))
        return;
    } else if (req.session.user._id == null) {
        next(new Error("شما لاگین نشده اید"))
        return;
    }
    let result = await UserService.getById(req.session.user._id);

    if (result.isSuccess) {
        next(); //If session exists, go to page
    } else {
        var err = new Error(result.message);

        next(err); //Error,  unauthorized page!
    }
}
//#endregion
//#region Pages
//#region login page
app.get("/login", (req, res) => {

    res.render("login");
})
app.post("/login", async(req, res) => {
        console.log("Logon post");
        if (!req.body.name || !req.body.password) {
            res.status("400");
            res.redirect("/login");
            return;
        }
        let result = await UserService.get(req.body.name, req.body.password);
        console.log("Result login :");
        console.log(result);
        if (result.isSuccess) {
            req.session.user = result.data;
            res.redirect("/privacy");
            return;
        }
        res.render("login", { message: result.message });
    })
    //#endregion
    //#region signup page

app.get("/signup", (req, res) => {

    res.render("signup");
})
app.post("/signup", async(req, res) => {
        if (!req.body.name || !req.body.password) {
            res.status("400");
            res.redirect("/signup");
            return;
        }
        console.log("name is :", req.body.name);
        console.log("pass is :", req.body.password);
        let result = await UserService.isExistUser(req.body.name);
        console.log("result")
        console.log(result)
        if (result.isSuccess)
            res.render("signup", { message: "کاربری با این نام وجود دارد" });

        let resultCreate = await UserService.create({ name: req.body.name, password: req.body.password });
        console.log("ResultCreate :")
        console.log(resultCreate);

        if (resultCreate.isSuccess) {
            req.session.user = resultCreate.data;
            console.log("req.session.user");
            console.log(req.session.user);
            res.redirect("/privacy");
            return;
        }
        res.render("login", { message: resultCreate.message });

    })
    //#endregion
    //#region logout
app.get("/logout", checkSignIn, (req, res) => {
        console.log(req.session);
        req.session.destroy((err) => {
            console.log("Session Clearing...");
            console.log(err);
        });
        res.redirect("/login");
    })
    //#endregion
    //#region privacy page
app.get("/privacy", checkSignIn, (req, res) => {
    res.render("privacy", { id: req.session.user._id });
});
//#endregion
//#endregion

app.listen(port, hostname, () => console.log(`Start server ...\nhttp://${hostname}:${port}/`));