const express = require('express')
const { handleComment, handleLike, handlePost, handleGetAllPosts} = require('../controllers/post.js')
const {auth} =require("../middlewares/auth.js")
const postRouter = express.Router()

//handle comment on a post 
postRouter.post("/:postId/comment", auth, handleComment)

//publish a new post 
postRouter.post("/publish",auth, handlePost)

//get all the posts on home page
postRouter.get("/getAllPosts", handleGetAllPosts)

//handle the like on a post
postRouter.post("/:postId/like",auth, handleLike)

module.exports = {postRouter}