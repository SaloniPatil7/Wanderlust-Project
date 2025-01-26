const mongoose=require("mongoose");
const Listing =require("../models/listing.js");
const initData=require("./data.js");

async function main(){
await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then(()=>{
console.log("connect to db");
})
.catch((err)=>{
    console.log("err");
})


const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj,owner:"6784f6d7c8c872102176fbb5"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();