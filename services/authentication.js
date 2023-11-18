const jwt=require('jsonwebtoken');
const secret="$uperM@n";
 
function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImage:user.profileimgURL
    }
    const token=jwt.sign(payload,secret);
    // const token=jwt.sign(payload,secret,{algorithm:""});// if we want to give specifi algo
    return token;
}

function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken

}
