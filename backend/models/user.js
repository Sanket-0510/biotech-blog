const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const { createJwtToken } = require('../util');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  salt:{
    type:String
  },
  password:{
     type:String,
     required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  following: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  userPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  savedList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  userDM: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  publishedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  likedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    default: [],
  },
  followedTopics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Topic',
    default: [],
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Notification',
    default: [],
  },
  socialMedia: {
    twitter: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
  },
  userStats: {
    posts: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
});


userSchema.static("matchPassword", async function(email,password){
  const user = await this.findOne({email})
  if (!user)  res.json({mssg: "user not found"})
  const salt = user.salt
  const providedPassword = createHmac("sha256", salt).update(password).digest("hex")
  if(!providedPassword===user.password) throw new Error ("incorrect password")
  const token = await createJwtToken(user)
  return token
  
})

userSchema.pre("save", function(next){
  const user = this
  if(!user.isModified("password")) return 
  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')
  this.salt = salt
  this.password= hashedPassword
  next()
})


const User = mongoose.model('User', userSchema);





module.exports = {userSchema,User}
