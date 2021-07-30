const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type : String,
    },
    email : {
        type : String
    },
    mobile : {
        type: String,
    },
    address : {
        type: String
    },
    city : {
        type: String
    },
    pincode: {
        type : String
    },
    state : {
        type : String
    },
    article : {
        type : String
    },
    color : {
        type : String
    },
    sole : {
        type : String
    },
    size: {
        type : String
    },
    quantity : {
        type : String
    },
    price : {
        type : String
    },
    remarks : {
        type : String
    },
    dispatch_date: {
        type : String
    },
    courier_company : {
        type : String
    },
    courier_ref : {
        type : String
    },
    date : {
        type : Date,
        default: Date.now()
    }
})

const userdb = mongoose.model("Customer", schema)
module.exports = userdb;