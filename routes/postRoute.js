const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const postController = require('../controllers/postController');
const router = new Router();
router.get("/ProfilePage/:id?",authenticated,postController.getProfilePage)
router.get("/MainPage",authenticated,postController.getMainPage)
router.get("/SinglePost/:id",authenticated,postController.getSinglePost)


module.exports=router