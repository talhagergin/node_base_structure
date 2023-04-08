const User = require('../models/userModel');
const createError = require('http-errors');

const allUsersList = async (req,res,next) => { 
    const allUsers =await User.find({});
    res.json(allUsers);
};

const getNowUserInfo =  (req,res,next)=>{
    res.json(req.user);
}

const getUserById = async (req,res,next)=>{
    const id = req.params.id;
    console.log(id);
    const user = await User.findById({ id });
    res.json(user);
};
const updateUser = async (req,res,next)=>{
    delete req.body.createdAt;

    
    const {error, value} = User.joiValidationForUpdate(req.body);
    if(error){
        next(createError(400,error));
    }else{
         try{
        const result = await User.findByIdAndUpdate({_id: req.user._id }, req.body, {new:true, runValidators:true});
        if(result){
            return res.json(result);
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(err){
    next(err);    
    }
    }
};

const createNewUser = async(req, res,next)=>{
    try{
        const newUser = new User(req.body);

        const { error, value } = newUser.joiValidation(req.body);
        if(error){
            next(error);
            console.log("Error while saving user:"+ error);
        }else{
            const result = await newUser.save();
            res.json(result);
        }
        
    }catch(err){
        next(err);
    }
};


const adminDeleteUser = async (req,res,next)=>{
    try{
        const result = await User.findByIdAndDelete({_id: req.params.id });
        if(result){
            res.json({
                mesaj:"User have been deleted",
        });
        }else{
            throw createError(404,'User not found');
        }
    }catch(err){
        next(createError(400,err));
    }
};

const deleteAllUsers = async (req,res,next) => {

try{
        const result = await User.deleteMany({isAdmin:false});
        if(result){
            return res.json({
                mesaj:"All Users have been deleted",
        });
        }else{
            throw createError(404,'User not found');
        }
    }catch(err){
        next(createError(400,err));
    }
};

const deleteCurrentUser = async (req,res,next)=>{

try{
        console.log(req.user);
        const result = await User.findByIdAndDelete({ _id: req.user._id });
        if(result){
            return res.json({
                mesaj:"Users have been deleted",
        });
        }else{
            throw createError(404,'User not found');
        }
    }catch(err){
        next(createError(400,err));
    }
};

const adminUpdateUser = async(req,res,next) =>{
    delete req.body.createdAt;

    
    const {error, value} = User.joiValidationForUpdate(req.body);
    if(error){ 
        next(createError(400,error));
    }else{
         try{
        const result = await User.findByIdAndUpdate({_id: req.params.id }, req.body, {new:true, runValidators:true});
        if(result){
            return res.json(result);
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(err){
    next(err);    
    }
    }
}

const login = async (req, res,next) => {
    try{
        const user = await User.login(req.body.email, req.body.password);
        const token = await user.generateToken();

        res.json({
            user,
            token
        });
    }catch(err){
        next(err);
    }
}

module.exports ={
    allUsersList,
    getNowUserInfo,
    updateUser,
    createNewUser,
    adminDeleteUser,
    deleteAllUsers,
    deleteCurrentUser,
    adminUpdateUser,
    login,
    getUserById,
}