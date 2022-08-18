const { response } = require('express');
var express = require('express');
var router = express.Router();
var fordb = require('..//fordb/fordb');
const signupData =require('..//sigupData/signupData')




/* GET home page. */
router.get('/',function(req,res){
var user=req.session.user 
  fordb.addTocart().then((productAdd)=>{
    console.log(productAdd)
    res.render('Partials/Userhead',{productAdd,admin:false,user})

  
})})

router.get('/user/login',function(req,res){
  res.render ("UserFile/login",{admin:false})
})  
router.get('/signin',function(req,res){
  res.render ("UserFile/signin",{admin:false})
})  

router.post('/signin',function(req,res){
  signupData.Signupfunction(req.body).then((data)=>{
console.log(req.body)
res(data)

})});
router.post('/user/login',(req,res)=>{
signupData.loginUser(req.body).then((response)=>{
  console.log(response) 
  if (response.loginStatus ) {
    req.session.loggedin=true
    req.session.user=response.user
console.log(response)
    res.redirect("/")

   
   } else  {
    console.log(response)
res.redirect("/user/login")

  }
})



})
router.get("/logout",(req,res)=>{
req.session.destroy()
res.redirect("/")

})

    

  








module.exports = router;
