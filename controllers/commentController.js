const { Error } = require('mongoose');
const comment = require('../models/comment');
const post = require('../models/post');



exports.createComment=async(req,res,next)=>{
    try {
        await comment.commentValidation(req.body);
        const isPostExist = await post.findById(req.params.id);
        if(!isPostExist){
            const error = new Error("هیچ پستی وجود ندارد");
        error.statusCode = 404;
        throw error;
        }
       await comment.create({
        text:req.body.text,
        userId : req.userId,
        postId : req.params.id
       })
       res.status(200).json({message:"با موفقیت کامنت گذاشته شد"});
    } catch (error) {
        next(error)
    }
}