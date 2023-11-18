const express=require('express')
const mongoose=require('mongoose');
const path=require('path')
const app=express();
const cookieParser=require('cookie-parser');
const userRoute=require('./routes/user');
const blogRoute=require('./routes/addBlog');
const Blog=require('./model/blog');



mongoose.connect('mongodb://127.0.0.1:27017/blogbuster')
const { checkForAuthenticationCookie } = require('./middlewares/authentication');


app.set("view engine",'ejs')
app.set("views",path.resolve('./views'))


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));


app.use('/user',userRoute);
app.use('/blog',blogRoute);
app.get('/',async (req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    })
})



app.listen(8000,()=>console.log("server started"))

