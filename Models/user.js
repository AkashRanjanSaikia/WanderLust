const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoosh = require("passport-local-mongoose");
const { schema } = require("./review");
const { required } = require("joi");


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
});

userSchema.plugin(passportLocalMongoosh);

module.exports = mongoose.model("user",userSchema);