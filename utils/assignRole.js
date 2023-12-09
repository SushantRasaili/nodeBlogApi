function assignRole(Users) {
    return async (req,res,next) => {
        const {loggedId} = req.params;
        const {userId,role} = req.body;
         
        try {
            const user = await Users.findById(loggedId);

            console.log(user);
            if(req.id === loggedId && user.role === 'Admin') {
                    const userRoleUpdated = await Users.findByIdAndUpdate(userId,{role:role},{new:true, runValidators: true});
                    if(userRoleUpdated)  {
                        res.userRoleUpdated = userRoleUpdated;
                        // res.status(200).json(userRoleUpdated);
                        next();
                    }
                    else {
                        res.status(400).json("User role can't be updated, try again");
                    }  
            }
            else {
                res.status(400).json("Invalid user trying to change the user role");
            }
        }
       catch(err) {
        res.status(500).json(err);
       }
    }

}

module.exports = {assignRole};