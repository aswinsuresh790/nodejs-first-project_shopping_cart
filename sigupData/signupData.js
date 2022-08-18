var db=require("../config/connection")
var Promise=require('promise')
var bcrypt=require('bcrypt')
var fordb = require('..//fordb/fordb');
var saltRounds = 10;
var ObjectId = require('mongodb').ObjectId;

module.exports={

Signupfunction:(userData) => {
     return new Promise(async(resolve, reject) => {
        const salt = await bcrypt.genSalt(10)
        userData.Password = await bcrypt.hash(userData.Password, salt)
       
        db.get().collection('loginuser').insertOne( userData).then((data) => {
            resolve(data.insertedId)
            resolve(data)
            console.log(data)
       
    })    
        })
    },
loginUser:(userData) => {
    return new Promise(async(resolve)=>{
        let result={}
        
        
        const user=await db.get().collection('loginuser').findOne({email:userData.email})
        

        if(!user){
            result.loginStatus=false
        }else{
            
            const validPassword=await bcrypt.compare(userData.Password,user.Password)
            console.log(validPassword)
           
            if(!validPassword){
             
                result.loginStatus=false
                 }   
                 
            else {
                result.user=user
                result.loginStatus=true
            }
        }
        resolve(result)

    })
}
}
