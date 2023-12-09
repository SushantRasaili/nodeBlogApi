const router = require('express').Router();
const verifyToken = require('../middleware/jwt');
const Users = require("../models/users");
const Posts = require("../models/posts");
const {isAfterTime} = require("../utils/date");
const {tagsAllowed} = require("../utils/date");


//Add Post
router.post("/addPost/:id",verifyToken, async(req,res) => {
    const {title,description,tags} = req.body;
    const userId = req.params.id;

    try {
        if(req.id === userId) {
            const latestId = await Posts.findOne({}, { postId: 1 }, { sort: { postId: -1 } });
            const idNumber = latestId.postId;
            const postId = (idNumber ? idNumber : 999) + 1;
            
            const post = new Posts({
                postId,
                title,
                description,
                tags,
                userId: req.id
            });


            if(isAfterTime()) {
                const postAdded = await post.save();

                if(postAdded) {
                    res.status(200).json("Post has been added")
                }
                else {
                    res.status(400).json("Sorry something went wrong");
                }
            }
            else {
                res.status(400).json("Please, try to add post after 5am");
            }
        }
        else {
            res.status(400).json("Invalid user trying to post");
        }
    }
    catch(err) {
    res.status(500).json(err);
    }
   
});


//Update Post
router.put("/updatePost/:postId",verifyToken, async(req,res) => {
    const {postId} = req.params;
    const {title,description,tags} = req.body;

    const postItem = await Posts.findById(postId);
    
        const userId = postItem.userId;

    try {
        const user = await Users.findById(userId);
        console.log(user);
        if(req.id === userId || user.role === 'Admin' || user.role === 'Editor') {
                const postUpdated = await Posts.findByIdAndUpdate(postId,{title,description,tags},{new:true});
                
                if(postUpdated)  {
                    res.status(200).json(postUpdated);
                }
                else {
                    res.status(400).json("Post is not updated, try again");
                }
            
        }
        else {
            res.status(400).json("Invalid user trying to update the post");
        }
    }
   catch(err) {
    res.status(500).json(err);
   }

});


//DELETE POST
router.delete("/deletePost/:postId",verifyToken, async(req,res) => {
    const {postId} = req.params;

    const postItem = await Posts.findById(postId);
    
        const userId = postItem.userId;

    try {
      
        if(req.id === userId || req.role === 'Admin') {
                const postDeleted = await Posts.findByIdAndDelete(postId);
                
                if(postDeleted)  {
                    res.status(200).json("Successfully post deleted");
                }
                else {
                    res.status(400).json("Post is not deleted, try again");
                }
            
        }
        else {
            res.status(400).json("Invalid user trying to delete the post");
        }
    }
   catch(err) {
    res.status(500).json(err);
   }

});



module.exports = router;