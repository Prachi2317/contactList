const { default: mongoose } = require("mongoose");

const moongose=require('mongoose');
// create a schema
const contactSchema= new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 phone:{
    type:String,
    required:true
 }
});
//define the collection and keeping the modal name capital 

const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;