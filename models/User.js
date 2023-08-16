const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin',
      },
},{timestamps:true})

const User = mongoose.model('user', userSchema);
module.exports = User;