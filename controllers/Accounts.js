const UserService = require("../Services/UserService");
const express = require('express');
const app = express.Router();
app.get("/", async(req, res) => {
    console.log("login page")
    res.render("login");
})

app.post("/", async(req, res) => {
    console.log("Logon post");
    if (!req.body.name || !req.body.password) {
        res.status("400");
        res.redirect("/");
        return;
    }
    let result = await UserService.Login(req.body.name, req.body.password);
    console.log("Result login :");
    console.log(result);
    if (result.isSuccess) {
        req.session.user = result.data;
        res.redirect("/privacy");
        return;
    }
    res.render("login", { message: result.message });
})


app.get("/signup", (req, res) => {

    res.render("signup");
})
app.post("/signup", async(req, res) => {
    console.log("/signup");
    if (!req.body.name || !req.body.password) {
        res.status("400");
        res.redirect("/accounts/signup");
        return;
    }
    console.log("name is :", req.body.name);
    console.log("username is :", req.body.username);
    console.log("mobileOrEmail is :", req.body.mobileOrEmail);
    console.log("pass is :", req.body.password);
    let result = await UserService.CheckExistUsername(req.body.username);
    console.log("result")
    console.log(result)
    if (result.isSuccess)
        res.render("signup", { message: "کاربری با این نام وجود دارد" });
    let b = req.body;
    let resultCreate = await UserService.CreateUser(b.name, b.username, b.password, b.mobileOrEmail);
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

app.get("/logout", (req, res) => {
    console.log(req.session);
    req.session.destroy((err) => {
        console.log("Session Clearing...");
        console.log(err);
    });
    res.redirect("/login");
})

module.exports = app;