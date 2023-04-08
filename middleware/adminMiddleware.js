const admin = (req,res,next)=>{

    if(req.user && !req.user.isAdmin){
        return res.status(403).json({message: 'You are not admin!'
    });
    }
    next();
}
module.exports = admin;