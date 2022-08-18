var db=require("../config/connection")
var Promise=require('promise')


module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('products').insertOne(product).then((data)=>{
            console.log(data)
            callback(data.insertedId)

        })},
    addTocart:()=>{
        return new Promise(async (resolve,reject)=>{
            let productAdd= await db.get().collection('products').find().toArray()
            resolve(productAdd)
        })
    
    
        

       
        
    }

}

