const User = require("../Models/user.js");



module.exports.signupForm = (req, res) => {
    res.render("./user/signup.ejs");
};

module.exports.signup = async (req, res) => {

    try{
    let { username, email, password } = req.body;
    console.log(req.body);
    const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
    req.login(registerUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "welcome to wanderlust!");
        res.redirect("/listings");
    })    
    
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }


};

module.exports.loginForm = (req,res)=>{
    res.render("./user/login.ejs");
};

module.exports.login =async (req, res) => {
    req.flash("success", "Welcome to WonderLust");
    let redirectUrl =res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
        
    };

    module.exports.logout =(req, res) => {
        req.logOut((err) => {
            if (err) {
                next(err);
            }
            req.flash("success", " You are loged out!");
            res.redirect("/listings");
        })
    };
