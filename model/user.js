const mongoose=require('mongoose');
const {createHmac,randomBytes}=require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    salt:{
        type:String
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:'USER'
    },
    profileimgURL:{
        type:String,
        default:"C:\Users\pdiar\OneDrive\Desktop\BloggingApplication\public\pp.avif"
    }

},{timestamps:true})

userSchema.pre('save', async function (next){
     const user=this;
    //  console.log("fkfkfk"+user);
     if(!user.isModified('password'))return;
     const salt1=randomBytes(16).toString(); 
     const hashedPassword=createHmac('sha256',salt1)
     .update(user.password)
     .digest('hex');
    //  console.log(hashedPassword);
     this.salt=salt1;
     this.password=hashedPassword;

     next()
})


userSchema.static("matchPassword",async function(email,password){
    const user=await this.findOne({email});
    // console.log(user);
    if(!user)throw new Error('User not found');
    const salt1 =user.salt;
    const userpassword=user.password;
    const userProvidedHash=createHmac('sha256',salt1)
    .update(password).digest('hex');
     
    if(userpassword!==userProvidedHash)throw new Error('User not found');
    const token=createTokenForUser(user);
    return token;
})

const User=mongoose.model('user',userSchema);
module.exports=User;


