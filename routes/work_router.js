const router = require('express').Router();
const mongoose  = require('mongoose')
const userdb = require('../model/model')


router.get('/work-order',ensureAuth,async(req,res)=>{
    const user = await userdb.find();
    res.render('work_order',{user})
})

router.get('/update-work/:id',async(req,res)=> {
    const id = req.params.id
    const data  = await userdb.findById(id)
    res.render('update-work',{data})

})

// update method
router.post('/update-work/:_id', async function (req,res,next) {
  try{
    const { _id: _id } = req.body;
    const profile = await req.body;
    console.log("data",profile)
    const updatedProfile = await userdb.findByIdAndUpdate( _id, {$set: req.body}, {new: true });
    req.flash('info','work order Updated Successfully')
      res.redirect('/work-order')
  }
 catch(error){
   console.log(error)
   next(error)
 }

})


router.get('/delete/:id', (req,res)=> {
  const id = req.params.id;
  userdb.findByIdAndDelete(id)
  .then(data => {
    req.flash('success', "Data Deleted Successfully")
   res.redirect('/work-order')
  })
  .catch(err => {
    res.status(500).send({messages : `Could not delete user with id = ${id}`})
  })
})

function ensureAuth(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
 }

module.exports = router;