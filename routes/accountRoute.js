const {Router} = require('express');

const accountController = require('../controllers/accountController');
const router = new Router();

router.post("/register",accountController.createUser)
router.post("/login",accountController.handleLogin)

module.exports=router