const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const postController = require('../controllers/postController');
const router = new Router();
router.get("/getProfilePage/:id?",authenticated,postController.getProfilePage)
router.get("/getMainPage",authenticated,postController.getMainPage)
router.get("/getSinglePost/:id",authenticated,postController.getSinglePost)


module.exports=router