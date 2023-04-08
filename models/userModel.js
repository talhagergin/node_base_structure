const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        minLength:3,
        maxLength:50,
    },
    userName: {
        type: String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:50,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:50,
    },
    password:{
        type: String,
        required:true,
        lowercase:true,
        trim:true
    },
    isAdmin:{
        type: Boolean,
        default:false
    }
},{collection:'users',timestamps:true});

const schema = Joi.object({
    name : Joi.string().min(3).max(50).trim(),
    userName : Joi.string().min(3).max(50).trim(),
    email : Joi.string().trim().email(),
    password : Joi.string().trim()
});
UserSchema.methods.generateToken = async function () {
    const loginUser = this;
    const token = await jwt.sign({_id:loginUser._id, email:loginUser.email,isAdmin:false,online:true},'secretkey',{expiresIn:'1h'});
    return token;
};

//for new user
UserSchema.methods.joiValidation = function(userObject){
    schema.required();
    return schema.validate(userObject);
};
UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;

    return user;
}
UserSchema.statics.login = async  (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw createError(400,"Email or password is wrong");
    }
    
    const passwordControl = await User.findOne({ password });
    if(!passwordControl){
        throw createError(400,"password is wrong");
    }
    return user;

    }
//for update user
UserSchema.statics.joiValidationForUpdate = function(userObject){
    return schema.validate(userObject);
};
const User = mongoose.model('User',UserSchema);

module.exports = User;