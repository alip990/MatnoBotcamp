const User = require("../models/user");
const UserConnection = require("../models/userConnection");
const imageUpload = require('../models/userImageUpload');
const post= require('../models/post');
const follow = require('../models/userConnection');

const shortId = require("shortid");
const sharp = require("sharp");
const appRoot = require('app-root-path');
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
  const foi = `${appRoot}/public/uploads/post`;
  if (image.length === 0) {
    const error = new Error("باید تصویری را انتخاب کنید");
    error.statusCode = 404;
    throw error;
  }
  try {
    if(!fs.existsSync(foi)){
      
      fs.mkdirSync(foi, { recursive: true })
    }
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
    const UserAddImage =await User.findById(req.userId);
    UserAddImage.imageUpload.push(img._id);
    UserAddImage.save();
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
   const newPost =  await post.create({...req.body,userId:req.userId})
    res.status(201).json({message:"با موفقیت پست جدید ایجاد شد",postID:newPost._id})
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
    const foi =  `${appRoot}/public/uploads/profile`;
    const UserAddImage =await User.findById(req.userId);
    if (image.length === 0) {
      const error = new Error("باید تصویری را انتخاب کنید");
      error.statusCode = 404;
      throw error;
    }
    if(!fs.existsSync(foi)){
      fs.mkdirSync(foi, { recursive: true })
    }
    
      const oldProfile = await imageUpload.findOne({userId:req.userId,type:'profile'})
      if(oldProfile){
        const pathImage=`${appRoot}/public/uploads/profile/${oldProfile.image}`
        if(fs.existsSync(pathImage)){
          console.log("000000000000000000000000000000000000000");
          await fs.unlinkSync(pathImage);
        }
        const index =  await UserAddImage.imageUpload.indexOf(oldProfile._id)
        if (index > -1) { 
          await UserAddImage.imageUpload.splice(index, 1); 
        }

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
     
    UserAddImage.imageUpload.push(img._id);
    UserAddImage.save();
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

//#region edit
//#region get information for edit
exports.getEdit=async(req,res,next)=>{
  try {
    const userEdit = await User.findById(req.userId).select('-_id fullName email userName phone');
    if(!userEdit){
      const err=new Error("کاریری یافت نشد");
      err.statusCode=404;
      throw err;
    }
    res.status(200).json({userEdit})
  } catch (error) {
    next(error);
  }
}
//#endregion
//#region edit
exports.handelEdit=async(req,res,next)=>{
  try {
    const { fullName, email ,phone,userName} = req.body;
    const user = await User.findById(req.userId);
    if(!user){
      const err=new Error("کاریری یافت نشد");
      err.statusCode=404;
      throw err;
    }
    let isEmailExist = await User.findOne({ email });
    let isUserNameExit = await User.findOne({userName});
    let isPhoneExit = await User.findOne({phone});
    if (isEmailExist&&email!==user.email) {
      const error = new Error(" کاربری با این ایمیل وجود دارد");
          error.statusCode = 404;
          throw error;
    } 
    else if(isUserNameExit&&userName!==user.userName){
      const error = new Error(" کاربری با این نام کاربری وجود دارد");
      error.statusCode = 404;
      throw error;
    }
    else if(isPhoneExit&&phone!==user.phone){
      const error = new Error(" کاربری با این شماره تلفن  وجود دارد");
      error.statusCode = 404;
      throw error;
    }else{
      user.fullName=fullName;
      user.phone = phone;
      user.userName=userName;
      user.email=email
      user.save();
      res.status(200).json({message:"با موفقیت ویرایش شد"})
    }
  } catch (error) {
    next(error)
  }
}
//#endregion
//#endregion
