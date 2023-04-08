const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://taki:12345@test.aw1t050.mongodb.net/test')
.then(()=>console.log('bağlandi'))
.catch(err => console.log(err));