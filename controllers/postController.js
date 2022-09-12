const post = require("../models/post");
const follow = require('../models/userConnection');

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
exports.getMainPage=async(req,res,next)=>{
  console.log("0000000000000000000000000000000");
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