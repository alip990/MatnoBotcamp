const Post = require('../Models/Post').Post;
const PostFiles = require('../Models/PostFiles').PostFiles;


async function AddPost(userId, files, Caption = "") {

}




const upload = require("express-fileupload");

const s3 = new AWS.S3({
    endpoint: process.env.AWS_EndPointUrl,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
async function uploadFile(file) {
    const params = {
        Bucket: process.env.AWS_BUCKET, // bucket you want to upload to
        Key: `test-${Date.now()}-${file.name}`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
        Body: file.data,
        ACL: "public-read",
    };
    const data = await s3.upload(params).promise();
    return data.Location; // returns the url location
}