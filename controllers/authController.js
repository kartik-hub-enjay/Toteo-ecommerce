const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const{generateToken} = require("../utils/generateToken")


module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "You already have an account, please login");
            return res.redirect("/");
        }
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("/");
            }
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    req.flash("error", err.message);
                    return res.redirect("/");
                }
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname
                });
                let token = generateToken(user);
                res.cookie("token", token);
                req.flash("success", "User created successfully");
                return res.redirect("/");
            });
        });
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/");
    }
};

module.exports.loginUser = async function (req, res) {

    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            req.flash("error", "Error comparing passwords");
            return res.redirect("/");
        }
        if (!result) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
        let token = generateToken(user);
        res.cookie("token", token);
        req.flash("success", "You are logged in");
        return res.redirect("/shop");
    });
};

module.exports.logOut = async function(req,res){
    res.cookie("token","");
    res.redirect("/");
}