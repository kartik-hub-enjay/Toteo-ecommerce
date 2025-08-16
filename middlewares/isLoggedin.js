const jwt = require("jsonwebtoken");
const user_model = require("../models/user_model");
module.exports.isLoggedin = async function(req, res, next) { 
    if (!req.cookies || !req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await user_model
            .findOne({ email: decoded.email })
            .select("-password");

        req.user = user;
        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
}
