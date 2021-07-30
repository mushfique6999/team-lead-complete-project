const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const signup   = require('../model/signup_model');

passport.use(
    new localStrategy({
      usernameField : "email",
      passwordField : "password"
    }, async(email, password, done)=> {
       try{
          const user = await signup.findOne({email});
          if(!user){
              return done(null, false, {message: "Email is not registered"})
          }

          const isMatch =   await user.isValidPassword(password)

          if(isMatch){
              return done(null, user)
          }else{
              return done(null, false, {message : "Password Incorrect"})
          }
    
       }catch(error){
           done(error )
       }
    })
)

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    signup.findById(id, function(err, user) {
      done(err, user);
    });
  });
