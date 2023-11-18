const {Router}=require('express');
const router=Router();
const path=require('path')
const Blog=require('../model/blog')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/${req.user._id}`))
    },
    filename: function (req, file, cb) {
      const fileName=`${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })

  
const upload = multer({ storage: storage })

router.get('/add-blog',(req,res)=>{
    res.render('addBlog.ejs',{
        user:req.user
    })
})
router.post('/',upload.single('coverImageURL'),async (req,res)=>{
    const {title,body}=req.body;
    const blog=await Blog.create({
        title,  
        body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`,
    });
    console.log(blog);
    return res.redirect(`/blog/${blog._id}`);

})





module.exports=router;