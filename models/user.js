// const { required } = require("joi");
const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:
    {
        type:String,
        required:true,
    },
    
    // username:{
    //     type:Number,
    //     min:1,
    //     max:5,
        
    // },
    //And password already defined in passport

});

userSchema.plugin(passportLocalMongoose);//autematic implement hashing salting 
module.exports=mongoose.model("User",userSchema);