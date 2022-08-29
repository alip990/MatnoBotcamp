const mongoose = require("mongoose");
//npm i mongoose : استفاده از دیتابیس منگو
mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/Instagram",
);
module.exports = mongoose;