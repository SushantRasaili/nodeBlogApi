const router = require('express').Router();
const Users = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User registration
router.post("/userRegister", async (req,res) => {
    const {username, fullname, email, password,role} = req.body;

    const hashPassword = await bcrypt.hash(password,12);    

    const user = new Users({
        username,
        fullname,
        email,
        password: hashPassword,
        role
    });
    if(role) {
        if(role.includes("Admin") || role.includes("Editor")) {
            return res.status(400).json("This kind of user registration is not allowed");
        }
    }
  

    const userAdded = await user.save();
    if(userAdded) {
        res.status(200).json("Successfully user registered");
    }
    else {
        res.status(400).json("Sorry something went wrong");
    }
    
});


//User Login
router.post("/userLogin", async (req,res) => {
    const {username} = req.body;
    const userpassword = req.body.password;

try {
    const userExist = await Users.findOne({username: username});
    if(userExist) {
        const verified = await bcrypt.compare(userpassword,userExist.password);
        const {password,_id,...user} =userExist;
        if(verified) { 
            const token = jwt.sign({id: _id,user},process.env.JWT_KEY,{expiresIn: "1d"});
            res.cookie("accessToken",token,{
                httpOnly: true,
                secure: false,
                sameSite: 'none',
                path: '/',
            }).status(200).json("User logged in successfully");

        }
        else {
            res.status(401).json("Invalid credentials");
        }
        }
        else {
            res.status(401).json("Invalid credentials");
        }
    }
catch(err) {
    console.log(err);
}   
});


//LOGOUT 
router.post("/logout",async (req, res) => {
    res
      .clearCookie('accessToken',{
        sameSite: "none",
        secure: true
      })
      .status(200)
      .send("User has been logged out.");
  });



module.exports = router;