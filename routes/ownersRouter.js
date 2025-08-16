const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model");

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
       let owners = await ownerModel.find();
       if(owners.length > 0){
        return res
        .status(503)
        .send("we cant create an owner")
       }

       let { fullname,email,password } = req.body;
     let createdOwner =  await ownerModel.create({
        fullname,
        email,
        password
       })
       res.status(201).send(createdOwner);
    })



}
router.get("/",function(req,res) {
    res.send("its working");
})
router.get("/admin", function(req, res) {
    let success = req.flash("success");
    let error = req.flash("error");
    res.render("createproducts", { success, error });
});


module.exports = router;