//#region startup
const app = require("express")();
const bodyParser = require("body-parser");


const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();
var path = require('path');
app.set("views", path.join(__dirname, 'front', 'views'));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.PROJECT_SECRET }));

const port = process.env.PORT;
const hostname = "localhost";

const checkSignIn = require("./middlewares/CheckSignIn").checkSignIn;
app.get("/privacy", checkSignIn, (req, res) => {
    res.render("privacy", { id: req.session.user._id });
});


app.use('/accounts', require("./controllers/Accounts"))

app.listen(port, hostname, () => console.log(`Start server ...\nhttp://${hostname}:${port}/\n
${path.join(__dirname, 'front', 'views')}`));