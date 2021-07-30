const express  = require('express');
const app      = express();
const dotenv   = require('dotenv').config();
const port     = process.env.PORT || 3000;
const path     = require('path');
const session  = require('express-session')
const connectFlash = require('connect-flash');
const passport  = require('passport')
const MongoStore = require('connect-mongo')
const connectDB = require('./database/connection');
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('assets'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie : {
        httpOnly : true,
    },
    store: MongoStore.create({mongoUrl : process.env.MONGO_URI})

}))

app.use(connectFlash())

//flash message middlewares
app.use((req,res,next)=> {
    res.locals.messages = req.flash();
    next();
})

app.use(passport.initialize());
app.use(passport.session())
require('./utils/passport')

app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
})

app.set("view engine", "ejs");



app.use('/', require('./routes/router'))
app.use('/',require('./routes/signup_router'))
app.use('/' ,require('./routes/profile_router'))
app.use('/', require('./routes/work_router'))
app.use('/', require('./routes/dispatch_router'))




app.get('/demo', (req,res)=> {
    console.log(process.env.ADMIN_EMAIL)
})

app.get('*', (req,res)=> {
    res.render('404')
})



function ensureAdmin(req,res,next){
    if(req.user.role === roles.admin){
        next()
    }else{
        const message = "You are not authorized to see this page"
        res.redirect('back')
    }
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
