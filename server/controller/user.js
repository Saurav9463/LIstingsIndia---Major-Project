const User = require("../models/user");

module.exports.signupform = (req,res)=>{
    res.json({ message: "Use POST /api/signup" });
}

module.exports.loginform = (req,res)=>{
    res.json({ message: "Use POST /api/login" });
}

module.exports.afterlogin = async(req,res)=>{
    res.json({ 
        message: "Logged in successfully", 
        user: { 
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email 
        } 
    });
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        res.json({ message: "Logged out successfully" });
    })
}

module.exports.signup = async (req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newuser = new User({username,email});
        const registereduser = await User.register(newuser,password);
        
        req.login(registereduser, function(err) {
            if (err) { return next(err); }
            res.status(201).json({ 
                message: "User created successfully", 
                user: {
                    _id: registereduser._id,
                    username: registereduser.username,
                    email: registereduser.email
                }
            });
        });
    }catch(e){
        res.status(400).json({ error: e.message });
    }
}