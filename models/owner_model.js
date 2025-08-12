const mongooose = require("mongoose");

const ownerSchema = mongooose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default: [],
    },
    picture:String,
    gstin:String,
});
module.exports = mongooose.model("owner",ownerSchema);