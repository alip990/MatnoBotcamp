const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const userController = require('../controllers/userController');
const router = new Router();

router.get("/followOrUmFollow/:id",authenticated,userController.followOrUnFollow)
router.post("/uploadPostImage",authenticated,userController.UploadImagePost)
router.post("/post",authenticated,userController.createPost)
router.post("/profile",authenticated,userController.createProfile)

router.get("/followers/:id?",authenticated,userController.getAllFollower)
router.get("/following/:id?",authenticated,userController.getAllFollowing)
router.get("/editProfile",authenticated,userController.getEdit)
router.post("/editProfile",authenticated,userController.handelEdit)

module.exports=router