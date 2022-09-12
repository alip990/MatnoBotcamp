const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const userController = require('../controllers/userController');
const router = new Router();

router.get("/followOrUmFollow/:id",authenticated,userController.followOrUnFollow)
router.post("/uploadPostImage",authenticated,userController.UploadImagePost)
router.post("/createPost",authenticated,userController.createPost)
router.post("/addProfile",authenticated,userController.createProfile)

router.get("/followers/:id?",authenticated,userController.getAllFollower)
router.get("/following/:id?",authenticated,userController.getAllFollowing)
module.exports=router