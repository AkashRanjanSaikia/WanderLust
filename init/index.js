const mongoose =require("mongoose");
const initdata =require("./data");
const Listing = require("../Models/listing");

main().then(()=>{
    console.log("connection is successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initdata.data=initdata.data.map((obj)=>({...obj,owner:"6790a8f8d65c8c3e831df7a9"}))
        await Listing.insertMany(initdata.data);
        console.log("Data has been initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};



initDB();


