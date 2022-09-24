const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const postController = require('../controllers/postController');
const router = new Router();
router.get("/profilePage/:id?",authenticated,postController.getProfilePage)
router.get("/mainPage",authenticated,postController.getMainPage)
router.get("/singlePost/:id",authenticated,postController.getSinglePost)


module.exports=router