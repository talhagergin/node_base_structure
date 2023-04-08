const router = require('express').Router();
//const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');
//get all users
router.get('/listUser',[authMiddleware,adminMiddleware],userController.allUsersList);
//logined user get info
router.get('/getUser',authMiddleware,userController.getNowUserInfo);
//update user 
router.patch('/updateUser',authMiddleware,userController.updateUser);
    
router.post('/createUser',userController.createNewUser);
    
/* Password with hashing
router.post('/',async(req,res,next)=>{
    try{
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hash(newUser.password,10);

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
});*/
router.delete('/:id',[authMiddleware,adminMiddleware], userController.adminDeleteUser);
   
  
router.get('/deleteAllUsers',[authMiddleware,adminMiddleware], userController.deleteAllUsers);

router.get('/meDelete',authMiddleware, userController.deleteCurrentUser);

router.patch('/:id',[authMiddleware,adminMiddleware], userController.adminUpdateUser);
    
router.get('/getUser:id',[authMiddleware,adminMiddleware],userController.getUserById);
router.post('/login', userController.login);
    
module.exports = router;