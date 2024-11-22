const express = require('express')
const { handleArticles } = require('../controllers/articles')


const articleRouter = express.Router()

//get the articles from the search bar 
articleRouter.post("/", handleArticles)


module.exports ={articleRouter}
