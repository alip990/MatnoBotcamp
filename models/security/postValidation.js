const Yup = require('yup');

exports.schema = Yup.object().shape({
    title: Yup.string()
        .required("عنوان الزامی می باشد")
        .min(4, "عنوان نباید کمتر از 4 کاراکتر باشد")
        .max(255, "عنوان نباید بیشتر از 255 کاراکتر باشد"),

    caption: Yup.string()
        .required(" کپشن   الزامی می باشد")
        .min(4, "کپشن   نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کپشن    نباید بیشتر از 255 کاراکتر باشد"),

    
        
   
});