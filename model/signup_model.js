const mongoose = require('mongoose');
const {roles}  = require('../utils/constants')
const bcrypt   = require('bcrypt');

const signup_schema = new mongoose.Schema({
   name : {
       type : String
   },
   email : {
       type : String,
       trim : true
   },
   phone : {
       type : String
   },
   password : {
       type : String,
       trim : true
   },
   role : {
       type : String,
       enum : [roles.admin, roles.client],
       default : roles.client
   }
});

signup_schema.pre('save', async function(next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password,salt)
            this.password = hashedPassword 
            if(this.email === process.env.ADMIN_EMAIL){
                this.role = roles.admin
            }
    }
        next()
    }catch(error){
        next(error)
    }
})

signup_schema.methods.isValidPassword = async function(password){
    try{
         return await bcrypt.compare(password, this.password)
    }catch(error){
        console.log(error)
    }
}


const signup = mongoose.model("signup", signup_schema);
module.exports = signup;
