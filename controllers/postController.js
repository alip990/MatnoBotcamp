const post = require("../models/post");
const follow = require('../models/userConnection');
const comment = require('../models/comment');
const { default: mongoose } = require("mongoose");
//#region get all post
exports.getAllPost = async (req, res, next) => {
  try {
    const numberPosts = await post.find({ userId: req.userId }).count();
    const posts = await post.find({ userId: req.userId }).populate("userId");
    if (!post) {
      if (!posts) {
        const error = new Error("هیچ پستی وجود ندارد");
        error.statusCode = 200;
        throw error;
      }
    }
    res.status(200).json({posts,numberPosts});

  } catch (error) {
    next(error);
  }
};
//#endregion
//#region first page
exports.getProfilePage=async(req,res,next)=>{
  try {
   let userId = req.params.id
    if(userId===undefined){
      userId = req.userId
    }
    console.log(userId);
    const numberPosts = await post.find({ userId:  userId}).count();
    const posts = await post.find({ userId: userId }).populate("userId");
    const numberFollower =await follow.find({FallowingId:userId}).count();
    const numberFollowing =await follow.find({FalowerId:userId}).count();
    res.status(200).json({numberPosts,posts,numberFollower,numberFollowing})
  } catch (error) {
    next(error);
  }
}
//#endregion
//#region get main page
exports.getMainPage = async(req,res,next)=>{
  try{
    const page = +req.query.page || 1;
    const postPerPage = 2;
    

    const following = await follow.find({FalowerId:req.userId}).select('-_id FallowingId');
    const followingId=[];
for (const item of following) {
  followingId.push(item.FallowingId.toString())
}
    console.log(following);
    let posts = await post.find({userId:followingId}).populate({path:'imageId',select:'image'}).populate({path:'userId',select:'userName fullName'}).skip((page-1)*postPerPage)
    .limit(postPerPage).sort({createdAt:'desc'})
    const numberOfPosts =posts.length;
    res.status(200).json({posts})
  } catch(err){
    next(err)
  }
}
//#endregion
//#region get single post
exports.getSinglePost=async(req,res,next)=>{
  try {
    const postUser = await post.findById(req.params.id).select('-__v').populate({path: 'imageId',select:'image'}).populate({path: 'userId',select:'fullName userName'});
    if(!postUser){
      const error = new Error("هیچ پستی وجود ندارد");
      error.statusCode = 404;
      throw error;
    }
    const commentPost =await comment.find({postId:postUser._id}).select('_id text').populate({path: 'userId',select:'fullName'});
    res.status(200).json({postUser,commentPost}) 

  } catch (error) {
    next(error)
  }
}
//#endregion