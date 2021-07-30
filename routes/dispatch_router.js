const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userdb = require('../model/model')
const {roles} = require('../utils/constants')

router.get('/dispatch', ensureAuth,ensureAdmin, async(req,res)=> {
    const user = await userdb.find();
    res.render('dispatch', {user})
})

router.get('/update-dispatch/:id',async(req,res)=> {
    const id = req.params.id
    const data  = await userdb.findById(id)
    console.log("dfdsfds",data)
    res.render('update-dispatch',{data})

    // res.render('update-dispatch',{user})
})

router.post('/update-dispatch/:_id', async function (req,res,next) {
    try{
      const { _id: _id } = req.body;
      const profile = await req.body;
      const updatedProfile = await userdb.findByIdAndUpdate( _id, {$set: req.body}, {new: true });
      req.flash('info','Dispatch Updated Successfully')
      res.redirect('/dispatch')
    }
   catch(error){
     console.log(error)
     next(error)
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
        const message = "You are not authorized to see this page"
        res.redirect('back')
    }
}
module.exports = router;