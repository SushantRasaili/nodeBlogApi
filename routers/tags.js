const router = require('express').Router();
const verifyToken = require('../middleware/jwt');
const Posts = require("../models/posts");
const {tagsAllowed} = require("../utils/date");


//ADD TAG
router.put("/addTag/:postId",verifyToken, async(req,res) => {
    const {postId} = req.params;
    const {tag} = req.body;

    const postItem = await Posts.findById(postId);
    
        const postCreatedAt = postItem.createdAt;
        const userId = postItem.userId;

    try {
        
        if(req.id === userId || req.role === 'Admin' || req.role === 'Editor') {
            if(tagsAllowed(postCreatedAt)) {
                const tagUpdated = await Posts.findByIdAndUpdate(postId,{$push: {tags:tag}},{new:true});
                if(tagUpdated)  {
                    res.status(200).json(tagUpdated);
                }
                else {
                    res.status(400).json("Post is not updated, try again");
                }
            }
            else {
                res.status(400).json("No addition of tags allowed after 1 hour");
            }
            
        }
        else {
            res.status(400).json("Invalid user trying to update the tag");
        }
    }
   catch(err) {
    res.status(500).json('gfh');
   }

});


// REMOVE TAG
router.delete("/deleteTag/:postId",verifyToken, async(req,res) => {
    const {postId} = req.params;
    const {tagIndex} = req.query;

    const postItem = await Posts.findById(postId);
    
        const userId = postItem.userId;

    try {
        
        if(req.id === userId || req.role === 'Admin' || req.role === 'Editor') {
           postItem.tags.splice(tagIndex,1);
            const tagDeleted = await postItem.save();
            res.json(tagDeleted);
        }
        else {
            res.status(400).json("Invalid user trying to delete the tag");
        }
    }
   catch(err) {
    res.status(500).json(err);
   }

});


module.exports = router;