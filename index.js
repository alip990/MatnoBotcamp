const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const connectionDB = require('./config/db');
const {setHeaders} = require('./middleware/headers');
const {setStatic} =require('./utils/setStatic');
const {errorHandler} = require('./middleware/errors');

//#region config
dotenv.config({
  path:"./config/config.env"
})
//#endregion
//#region connection database
connectionDB();
//#endregion
const app = express();
//#region body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
//#endregion
//#region headers
app.use(setHeaders);
//#endregion
//#region File upload
app.use(fileUpload());
//#endregion
//#region static file
setStatic(app);
//#endregion


//#region Routes
app.use("/account",require('./routes/accountRoute'));
app.use("/users",require('./routes/userRoute'));
app.use("/post",require('./routes/postRoute'));
//#region 404
app.use(errorHandler)
//#endregion
//#endregion




const port = process.env.PORT||4000;
const server = app.listen(port, () =>
console.log(`Server Run in ${process.env.NODE_ENV} on port ${port}`)
);

module.exports = server;
