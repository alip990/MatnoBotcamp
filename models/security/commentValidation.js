const Yup = require('yup');

exports.schema = Yup.object().shape({
    text: Yup.string()
        .required("متن پیام الزامی می باشد")
        .min(4, "متن پیام نباید کمتر از 4 کاراکتر باشد")
        .max(255, "متن پیام نباید بیشتر از 255 کاراکتر باشد"),


        
   
});