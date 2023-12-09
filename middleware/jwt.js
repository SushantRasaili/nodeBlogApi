const jwt = require('jsonwebtoken');

 const verifyToken =(req,res,next) => {
    const token = req.cookies.accessToken;
    // console.log(req.cookies);
          if(!token) {
            return res.status(401).json("You are not authenticated");
          }
          else {
            jwt.verify(token,process.env.JWT_KEY,(err,payload) => {
                if(err) {
                  return res.status(403).send("Invalid token");
                }
                // console.log(payload.id)
                req.id = payload.id;
                req.role = payload.user._doc.role;
                next();
          });
        }
}

module.exports = verifyToken;