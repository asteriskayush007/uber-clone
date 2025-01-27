const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema ({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name at least 3 Characters long']
        },
        lastname:{
            type:String,
            minlength:[3,'last name at least 3 Characters long']
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:[10, 'Email should at least 10 Character long'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:true,
        select:false,
        match:[/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character']
    },
    socketId:{
        type:String
    }
    
})


userSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(){
    const result = await bcrypt.compare(password, this.password)
    return result;
}

userSchema.statics.hashPassword = async function(){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;