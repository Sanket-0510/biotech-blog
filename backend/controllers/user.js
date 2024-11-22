const {User} = require("../models/user");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const {isStrongPassword} = require("../util");

//handler function to handle the signup
const handlesignup = async (req, res) => {
  try {
    const { name, email, about, twitter, facebook, linkedin, password } =req.body;
    console.log(req.body)
    const socialMedia = {
        twitter,facebook,linkedin
    }
    const profileImage =  "/images/something"

    if (!isStrongPassword(password))
      res.json({ mssg: "password should be strong" });
    
    
    const newUser = new User({
      name,
      email,
      about,
      profileImage,
      password,
      socialMedia:socialMedia
    });
    const user = await newUser.save()
    res.send(user)
  } catch (e) {
    console.log(e);
  }
};

//handler function to handle sigin of user 
const handlesignin = async (req, res) => {
  try {
    const requestData = JSON.parse(req.body.data)
    if (requestData) {
      const { email, password } = requestData
      const token = await User.matchPassword(email, password);
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid request format' });
    }
  } catch (e) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};


//handler function to handle the user profile of the user
const handleUserProfile = async(req,res)=>{
  try{
    const data = await req.user
    const user = await User.findOne({email:data.email})
    res.json(user)
  }catch(e){
    console.log(e)
  }
}


//handler function to handle the userSavedList
const handleSavedList = async(req,res)=>{
  try{
  const user = await User.find({email:req.user.email})
  res.json(user)
  }catch(e){
    console.log(e)
  }
}



const handleFollow = async(req,res)=>{
     
}

const handleUserDm = async(req,res)=>{
  
}



module.exports = {handlesignup,handlesignin, handleUserProfile, handleSavedList}