const mongoose  = require('mongoose');


const connectDB = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI2,{
            useNewUrlParser:true,
            useUnifiedTopology: true,   
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`Mongodb Connected: ${con.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB