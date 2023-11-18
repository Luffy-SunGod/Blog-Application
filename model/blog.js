const mongoose=require('mongoose');
const {Schema}=mongoose;

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,

    }
    ,
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'//collection
    }

},{timestamps:true})



const Blog=mongoose.model('blog',blogSchema);
module.exports=Blog;