const express=require('express');
const path=require('path');
const port=8000;
// require the moongose.js file
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
 app.use(express.static('assests'));

//middleware1
// app.use(function(req,res,next){
// //  console.log("middleware 1 called");
//  req.myName="arpan";
//  next();
// });
//middleware2

// app.use(function(req,res,next){
// //  console.log("middleware 2 is called");
// console.log("called from mw2",req.myName)
//  next();
// });

var contactList=[
   {
      name:"arpan",
      phone:1455677
   },
   {
      name:"prachi",
      phone:5677
   },
   {
      name:"veena",
      phone:78
   }
]
app.get('/',function(req,res){
   // console.log("in controller",req.myName);
   Contact.find({},function(err,contacts){
           if(err){
            console.log('Error in fetching contacts from db');
            return;
           }
           return  res.render('home',{
            title:"Contact List",
            contact_list: contacts
            
           });

   });

  
  });
  app.get('/practice',function(req,res){
   return res.render('practice');
  });



app.post('/create-contact',function(req,res){
   // contactList.push({
   //    name:req.body.name,
   //    phone:req.body.phone
   // });
   // contactList.push(req.body);
   Contact.create({ 
      name:req.body.name,
      phone:req.body.phone
   }, function(err,newContact){
      if(err){
         console.log('error in creating a contact');
         return;
      }
      console.log('******',newContact);
      
   });
//  return res.redirect('/');
return res.redirect('back');

});

// for deleting a contact
app.get('/delete-contact',function(req,res){
// get the id from query in the url
   console.log(req.query);
   // let phone=req.query.phone;
   let id = req.query.id;
   // let contactIndex=contactList.findIndex(function find(contact){return  contact.phone==phone} );
   // console.log(contactIndex);
   // if(contactIndex !=-1){
   //    contactList.splice(contactIndex,1);
   // }
   // return res.redirect('back');
   Contact.findByIdAndDelete(id,function(err){
      if(err){
         console.log('error in deleting an object from database');
         return;
      }

   });
   return res.redirect('back');

});



app.listen(port,function(err){
 if(err){
    console.log('error in running the server',err);
 }
 console.log('yup! My express server is running on port : ',port);
});