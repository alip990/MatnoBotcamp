const fs = require('fs')
const cuid = require("cuid");

//hashing
const bcrypt = require('bcrypt');
const saltAround = 10;


const mongoose = require("./dbContext");
const res = require('express/lib/response');
//#region models
const UserModel = mongoose.model("user", {
    _id: { type: String, default: cuid },
    name: String,
    password: String,

});

//#endregion
let result = {
    message: "",
    isSuccess: false,
    data: null
};

async function convertToHash(value) {
    const salt = await bcrypt.genSaltSync(saltAround);
    const hashedValue = await bcrypt.hashSync(value, salt);
    console.log("hashedValue")
    console.log(hashedValue)
    return hashedValue;
}
async function create(fields) {
    try {
        fields.password = await convertToHash(fields.password);
        result.data = await new UserModel(fields).save();
        result.isSuccess = true;

    } catch (error) {
        result.isSuccess = false;
        result.message = error;

    } finally {
        return result;
    }

}
async function isExistUser(name) {
    try {
        let data = null;
        data = await UserModel.findOne({ name: name });

        result.isSuccess = data != null;

    } catch (error) {
        result.isSuccess = false;
        result.message = error;

    } finally {
        return result;
    }
}
async function get(name, password) {
    try {
        password = await convertToHash(password);
        result.data = await UserModel.findOne({ name: name, password: password });
        result.isSuccess = result.data != null;

    } catch (error) {
        result.isSuccess = false;
        result.message = error;

    } finally {
        return result;
    }
}
async function getById(_id) {
    try {
        result.data = await UserModel.findById(_id);
        result.isSuccess = result.data != null;

    } catch (error) {
        result.isSuccess = false;
        result.message = error;

    } finally {
        return result;
    }
}
async function getList(query) {

    try {
        result.product = await ProductModel.find(query).sort({ _id: 1 });
        result.isSuccess = true;
    } catch (error) {
        result.message = error;
        result.isSuccess = false;
    } finally {
        return result;
    }

}
async function edit(_id, fields) {
    try {
        result.product = await ProductModel.updateOne({ _id }, fields);
        result.isSuccess = true;
    } catch (error) {
        result.message = error;
        result.isSuccess = false;
    } finally {
        return result;
    }


}
async function remove(_id) {
    try {
        result.product = await ProductModel.remove({ _id });
        result.isSuccess = true;
    } catch (error) {
        result.message = error;
        result.isSuccess = false;
    } finally {
        return result;
    }

}
module.exports.UserService = {
    create,
    get,
    getById,
    edit,
    remove,
    getList,
    isExistUser
};