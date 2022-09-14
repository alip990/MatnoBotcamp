const post = require("../models/post");
const follow = require('../models/userConnection');
const comment = require('../models/comment');
const user = require('../models/user');
const image = require('../models/userImageUpload');


//#region profile
exports.getProfilePage=async(req,res,next)=>{
  try {
   let userId = req.params.id
    if(userId===undefined){
      userId = req.userId
    }
    const userPage = await user.findById(userId).select('fullName userName').populate({path:'imageUpload',match:{type:'profile'},select:'image'}) 
    userPage.imageUpload[0].image=`${process.env.PROFILEADDRESS}${userPage.imageUpload[0].image}`
    const numberPosts = await post.find({ userId:  userId}).count();
    const posts = await post.find({ userId: userId }).select('title caption').populate({path:'imageId',select:'image'}).sort({createdAt:'desc'});
    for (const item of posts) {
      item.imageId.image=`${process.env.POSTADDRESS}${item.imageId.image}`
      
    }
    const numberFollower =await follow.find({FallowingId:userId}).count();
    const numberFollowing =await follow.find({FalowerId:userId}).count();
    res.status(200).json({userPage,numberPosts,posts,numberFollower,numberFollowing})
  } catch (error) {
    next(error);
  }
}
//#endregion
//#region get main page
exports.getMainPage = async(req,res,next)=>{
  try{
    const page = +req.query.page || 1;
    const postPerPage = +req.query.postPerPage||2;
    

    const following = await follow.find({FalowerId:req.userId}).select('-_id FallowingId');
    const followingId=[];
for (const item of following) {
  followingId.push(item.FallowingId.toString())
}
    let posts = await post.find({userId:followingId}).populate({path:'imageId',select:'image'}).populate({path:'userId',select:'userName fullName',populate:{path:'imageUpload',match:{type:'profile'},select:'image'}}).skip((page-1)*postPerPage)
    .limit(postPerPage).sort({createdAt:'desc'})

    for (const item of posts) {
      item.imageId.image=`${process.env.POSTADDRESS}${item.imageId.image}`
      const text=item.userId.imageUpload[0].image.search(process.env.PROFILEADDRESS)
      if(text===-1){
      item.userId.imageUpload[0].image=`${process.env.PROFILEADDRESS}${item.userId.imageUpload[0].image}`
      }
    }
    const numberOfPosts =posts.length;
    res.status(200).json({posts,numberOfPosts})
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
    const commentPost =await comment.find({postId:postUser._id}).select('_id text').populate({path: 'userId',select:'fullName userName imageUpload',populate:{path:'imageUpload',match:{type:'profile'},select:'image'}});

  for (const item of commentPost) {
    const text=item.userId.imageUpload[0].image.search(process.env.PROFILEADDRESS)
    if(text===-1){
    item.userId.imageUpload[0].image=`${process.env.PROFILEADDRESS}${item.userId.imageUpload[0].image}`
    }
  }
 
    
    res.status(200).json({postUser,commentPost}) 
  } catch (error) {
    next(error)
  }
}
//#endregion