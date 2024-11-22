const express = require('express');
const userRoute = express.Router();
const { handlesignup, handlesignin, handleUserProfile, handleSavedList } = require('../controllers/user.js');
const {auth} = require("../middlewares/auth.js")

//user signup route
userRoute.post('/signup', handlesignup);

//get the user profile route
userRoute.get("/profile",auth, handleUserProfile )


//user signin route 
userRoute.post('/signin', handlesignin)

//saved list of user 
userRoute.get("/savedList", auth, handleSavedList)



module.exports = userRoute;
