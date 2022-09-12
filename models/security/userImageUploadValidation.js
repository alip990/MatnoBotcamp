const Yup = require('yup');

exports.schema = Yup.object().shape({
    image: Yup.object().shape({
        name: Yup.string().required("عکس بند انگشتی الزامی می باشد"),
        size: Yup.number().max(3000000, "عکس نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(
            ["image/jpeg", "image/png"],
            "تنها پسوندهای png و jpeg پشتیبانی می شوند"
        ),
    }),
});