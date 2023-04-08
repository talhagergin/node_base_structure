const express = require('express');
require('./db/dbConnection');
const errorMiddleware = require('./middleware/errorMiddleware');
const jwt = require('jsonwebtoken');
//ROUTES
const useRouter= require('./router/userRouter.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users',useRouter);

app.get('/',(req,res) =>{
    res.status.json({'mesaj':'hg'});
});
app.post('/',(req,res) =>{
    res.status(200).json(req.body);
});
app.use(errorMiddleware);
app.listen(3000,() => {
    console.log('listening on port 3000');
});