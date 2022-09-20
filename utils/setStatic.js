const path = require("path");

const express = require("express");

exports.setStatic = (app) => {
  app.use(express.static(path.join(__dirname,"..", "public")));
 
};