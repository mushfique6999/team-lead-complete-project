const express = require('express');
const router  = express.Router();
const userdb   = require('../model/model')
const signup   = require('../model/signup_model')
const {roles}  = require('../utils/constants')
const passport = require('passport')

router.get('/',async(req,res)=> {
    res.render('home')
})

router.get('/leads',ensureAuth,ensureAdmin,(req,res)=> {
    res.render('index')
})

router.post('/', async (req,res)=> {
   try{
       const query = await new userdb(req.body)
       await  query.save()
       req.flash("success","Data Created Successfully");
       res.redirect('/leads')
   }catch(error){
       console.log(error)
   }
})


function ensureAuth(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
 }

 function ensureAdmin(req,res,next){
    if(req.user.role === roles.admin){
        next()
    }else{
         res.redirect( 'back'  )
    }
  }
module.exports = router;