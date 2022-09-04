const UserService = require("../Services/UserService");
const express = require('express');
const app = express.Router();

app.get("/:username",(req,res)=>{
    req.params.username
})