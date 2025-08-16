const express = require("express");
const router = express.Router();
const { isLoggedin } = require("../middlewares/isLoggedin");
const productModel = require("../models/product_model");
const user_model = require("../models/user_model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success ,loggedIn : false});
});

router.get("/shop", isLoggedin, async function (req, res) {
  try {
    const products = await productModel.find();
    let success = req.flash("success")
    res.render("shop", { products , success });
  } catch (err) {
    req.flash("error", "Could not load products");
    res.redirect("/");
  }
});

router.get("/cart",isLoggedin,async function(req,res){
    let user = await user_model
    .findOne({email:req.user.email})
    .populate("cart");
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart",{ user , bill });
})


router.get("/addtocart/:productid", isLoggedin,async function(req,res){
  let user = await user_model.findOne({email:req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success","Added to cart");
  res.redirect("/shop");
})
module.exports = router;
