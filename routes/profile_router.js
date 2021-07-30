const router = require('express').Router();
const userdb = require('../model/model')
const {roles} = require('../utils/constants')

router.get('/profile',ensureAuth, ensureAdmin, async(req,res)=> {
   const user = await userdb.find();
   res.render('profile', {user})
})

router.get('/update-profile/:id',async(req,res)=> {
    const id = req.params.id
    const data  = await userdb.findById(id)
    console.log("dfdsfds",data)
    res.render('update-profile',{data})

})

//update method
router.post('/update-profile/:_id', async function (req,res,next) {
    try{
      const { _id: _id } = req.body;
      const profile = await req.body;
      console.log("data",profile)
      const updatedProfile = await userdb.findByIdAndUpdate( _id, {$set: req.body}, {new: true });
      req.flash('info','Profile Updated Successfully')
      res.redirect('/profile')
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
