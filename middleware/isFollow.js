const post = require('../models/post');
const userConnection = require('../models/userConnection');
exports.isFollow =async (req, res, next) => {

  try {
    

      const postUser =await post.findById(req.params.id);
      if(!postUser){
        const error = new Error("چنین پستی وجود ندارد");
          error.statusCode = 401;
          throw error;
      }
      const isFollow =await userConnection.findOne({FalowerId:req.userId,FallowingId:postUser.userId});
      if(!isFollow&&postUser.userId.toString()!==req.userId){
        const error = new Error(" برای کامنت گذلری ابتدا باید فرد را دنال کنید");
          error.statusCode = 401;
          throw error;
      }

      next();
  } catch (err) {
      next(err);
  }
};