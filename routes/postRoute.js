const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const postController = require('../controllers/postController');
const router = new Router();
router.get("/AllPost",authenticated,postController.getAllPost)
router.get("/getMainPage/:id?",authenticated,postController.getMainPage)

module.exports=router