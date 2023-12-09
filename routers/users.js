const router = require('express').Router();
const verifyToken = require('../middleware/jwt');
const Users = require("../models/users");
const Posts = require("../models/posts");
const {pagination} = require("../utils/pagination");
const {assignRole} = require("../utils/assignRole");


//ASSIGN Role
router.put("/assignRole/:loggedId",verifyToken,assignRole(Users), async(req,res) => {
    res.status(200).json(res.userRoleUpdated);
});

//Pagination    Users
router.get("/users",verifyToken, pagination(Users), async(req,res) => {
    res.status(200).json(res.paginatedResults);
});

//Pagination Posts
router.get("/posts",pagination(Posts), async(req,res) => {
    res.status(200).json(res.paginatedResults);
});


module.exports = router;