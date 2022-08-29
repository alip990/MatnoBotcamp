//hashing
const bcrypt = require('bcrypt');
const saltAround = 10;

async function convertToHash(value = "") {
    const salt = await bcrypt.genSaltSync(saltAround);
    const hashedValue = await bcrypt.hashSync(value, salt);
    console.log("hashedValue")
    console.log(hashedValue)
    return hashedValue;
}
module.exports = convertToHash;