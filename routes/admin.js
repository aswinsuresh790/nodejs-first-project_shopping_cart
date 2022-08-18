const hbs = require('hbs');
var express = require('express');
var fileupload=require('express-fileupload')

var router = express.Router();
var fordb = require('..//fordb/fordb');
const fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res,next) {
  fordb.addTocart().then((productAdd)=>{
    console.log(productAdd)
    res.render('Partials/Adminhead',{productAdd,admin:true})
  })

  







});
  router.get('/add-product',function(req,res){
    res.render('admin/add-products',{admin :true})
  })
router.post('/add-product',(req,res)=>{
  console.log(req.body)  
  console.log(req.files.Image);
  
  fordb.addProduct(req.body,(result)=>{
    let image= req.files.image;

    console.log(result)
    
    image.mv('./public/products/'+result+'.jpg',(err,done)=>{
      if (!err){
        res.render("admin/add-products")
      }
      else{
        console.log(err);
      }
    })  
  
  
})});


module.exports = router;
