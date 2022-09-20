const User = require("../models/user");
const UserConnection = require("../models/userConnection");
const imageUpload = require('../models/userImageUpload');
const post= require('../models/post');
const follow = require('../models/userConnection');


const shortId = require("shortid");
const sharp = require("sharp");
const appRoot = require('app-root-path');
const yup = require('yup');
const fs = require('fs');

//#region follow Or unfollow
exports.followOrUnFollow = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = User.findOne({ _id: userId });
    if (!user) {
      const error = new Error(
        "کاربری با این مشخصات برای دنبال کردن وجود ندارد"
      );
      error.statusCode = 404;
      throw error;
    }
    const isFollow = await UserConnection.findOne({
      FalowerId: req.userId,
      FallowingId: userId,
    });
    if (isFollow) {
      await UserConnection.findOneAndRemove({ _id: isFollow._id });
      res.status(200).json({ message: "با موفقیت ان فالو شد" });
    } else {
      await UserConnection.create({
        FalowerId: req.userId,
        FallowingId: userId,
      });
      res.status(200).json({ message: "با موفقیت  فالو شد" });
    }
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region Post
//#region upload image
exports.UploadImagePost = async (req, res, next) => {
  const image = req.files ? req.files.image : {};
  const fileName = `${shortId.generate()}_${image.name}`;
  const uploadPath = `${appRoot}/public/uploads/post/${fileName}`;
  if (image.length === 0) {
    const error = new Error("باید تصویری را انتخاب کنید");
    error.statusCode = 404;
    throw error;
  }
  try {
    await imageUpload.imageValidation({image});
    await sharp(image.data)
      .resize(800, 800)
      .jpeg({ quality: 60 })
      .toFile(uploadPath)
      .catch((err) => console.log(err));

   const img =  await imageUpload.create({
      image:fileName,
      userId : req.userId,
      type:"post"
    });  
    res
      .status(200)
      .json({ message: "با موفقیت اضافه شد", filePath: `${process.env.API}/uploads/post/${fileName}`, imageId:img._id });
  } catch (err) {
    next(err);
  }
};
//#endregion
//#region add post
exports.createPost=async(req,res,next)=>{
  try {
    await post.postValidation(req.body);
   
    const image =await imageUpload.findById(req.body.imageId);

    if(!image||(image.userId).toString()!==req.userId){
      const error = new Error("لطفا بار دیگر تصویر را بارگیری کنید");
      error.statusCode = 404;
      throw error;
    }
    await post.create({...req.body,userId:req.userId})
    res.status(201).json({message:"با موفقیت پست جدید ایجاد شد"})
  } catch (error) {
    next(error)
  }
}
//#endregion
//#endregion

//#region Add profile
exports.createProfile = async(req,res,next)=>{
  try {
    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/profile/${fileName}`;
    if (image.length === 0) {
      const error = new Error("باید تصویری را انتخاب کنید");
      error.statusCode = 404;
      throw error;
    }
    
      const oldProfile = await imageUpload.findOne({userId:req.userId,type:'profile'})
      if(oldProfile){
        await fs.unlinkSync( `${appRoot}/public/uploads/profile/${oldProfile.image}`);
        await imageUpload.findByIdAndRemove(oldProfile._id.toString())
       
      

      }
      await imageUpload.imageValidation({image});
      await sharp(image.data)
        .resize(200, 350)
        .jpeg({ quality: 60 })
        .toFile(uploadPath)
        .catch((err) => console.log(err));
  
     const img =  await imageUpload.create({
        image:fileName,
        userId : req.userId,
        type:"profile"
      });  
      res
        .status(200)
        .json({ message: "با موفقیت اضافه شد" });
    
  } catch (error) {
    next(error)
  }
  }

//#endregion

//#region get follower
exports.getAllFollower = async(req,res,next)=>{
  try {
    console.log("0000000000000000000000000000000000");
    let userId = req.params.id
    if(userId===undefined){
      userId = req.userId
    }
    const followers =await follow.find({FallowingId:userId}).populate('FalowerId');
    res.status(200).json({followers})
  } catch (error) {
    next(error);
  }
}
//#endregion

//#region get following
exports.getAllFollowing = async(req,res,next)=>{
  try {
    console.log("0000000000000000000000000000000000");
    let userId = req.params.id
    if(userId===undefined){
      userId = req.userId
    }
    const followings =await follow.find({FalowerId:userId}).populate('FallowingId');
    res.status(200).json({followings})
  } catch (error) {
    next(error);
  }
}
//#endregion
