const {Router} = require('express');

const {authenticated} =require('../middleware/auth');
const {isFollow} =require('../middleware/isFollow');
const commentController = require('../controllers/commentController');
const router = new Router();
router.post("/Comment/:id",authenticated,isFollow,commentController.createComment)

module.exports=router