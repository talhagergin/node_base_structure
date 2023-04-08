const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = async (req,res,next) =>{
    try{
        if(req.header('Authorization'))
        {
        const token= req.header('Authorization').replace('Bearer ','')
        const sonuc =jwt.verify(token,'secretkey');
        const findedUser =  await User.findById({_id: sonuc._id});
        if(findedUser){
            req.user = findedUser;
        }
        else{
            throw new Error('Please login');
        }
        
        next();
        }
        else{
            throw new Error('Please Login');
        }
}
    catch(err){
        next(err);
    }
}

module.exports = auth;