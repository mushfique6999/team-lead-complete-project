const router = require('express').Router();
const signup = require('../model/signup_model')
const passport = require('passport');
const {body, validationResult } = require('express-validator');


router.get('/register',ensureNotAuth,(req,res)=> {
   res.render('register')
})

router.post('/register',ensureNotAuth,[
    body('email').trim().isEmail().withMessage('Email Must Be valid Email')
    .normalizeEmail().toLowerCase(),
    body('password').trim().isLength(4).withMessage('Password Length Short, min 4 char required'),
    body('password2').custom((value, {req})=>{
       if(value !== req.body.password){
           throw new Error('Password do not match')
       }
       return true;
    })
], async (req,res)=> {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
           errors.array().forEach(error => {
               req.flash('error', error.msg)
           })
           res.render('register', {email : req.body.email, name: req.body.name, phone:req.body.phone ,messages: req.flash()});
           return;
        }
        const { email } = req.body;
        const doesExist = await signup.findOne({ email });
        if (doesExist) {
          req.flash('warning', 'Username/email already exists');
          res.redirect('/register');
          return;
        }
        const user = new signup(req.body);
        await user.save();
        req.flash('success',`${user.email} registered Successfully, you can now login`)
        res.redirect('/login')
    }
    catch(error){
        console.log(error)
    }   
})

router.get('/login',ensureNotAuth,(req,res)=> {
    res.render('login')
})

router.post('/login',ensureNotAuth,passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: '/login',
    failureFlash: true,
})
);

router.get('/logout',(req,res)=>{
    req.flash('info',` logout Successfully`)
    req.logout();
    res.redirect('/')
})

function ensureNotAuth (req,res,next){
    if(req.isAuthenticated()){
        res.redirect('back')
    }else{
        next()
    }
}


module.exports = router;