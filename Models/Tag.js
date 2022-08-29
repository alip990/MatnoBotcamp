const mongoose = require("../Connections/dbContext");
const cuid = require("cuid");

//تگ هایی که میتونه درون پست گذاشته بشه و با اونا سرچ بهتر میشه
const Tag = mongoose.model("Tag", {
    _id: { type: String, default: cuid },
    Name: {
        type: String,
        validate: {
            validator: (val) => {
                if (!val.match(/^\w*$/))
                    return false;
                return true;
            },
            message: "تگ نمیتواند شامل فاصله و یا مقدایری غیر از حروف انگلیسی و کاراکتر '_' باشد"
        }
    },



});